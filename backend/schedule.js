const cron = require('node-cron');
const axios = require('axios');

module.exports = async () => {
  const isSameMinute = (a, b) => (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate() &&
      a.getHours() === b.getHours() &&
      a.getMinutes() === b.getMinutes()
  );

  const getNextRunDate = (plan) => {
    const { dateTimeLaunch, repeatUnit, repeatEvery = 1 } = plan;

    if (!repeatUnit || repeatEvery <= 0) return null;

    const nextDate = new Date(dateTimeLaunch);
    switch (repeatUnit) {
      case 'minute':
        nextDate.setMinutes(nextDate.getMinutes() + repeatEvery);
        break;
      case 'hour':
        nextDate.setHours(nextDate.getHours() + repeatEvery);
        break;
      case 'day':
        nextDate.setDate(nextDate.getDate() + repeatEvery);
        break;
      case 'week':
        nextDate.setDate(nextDate.getDate() + 7 * repeatEvery);
        break;
      case 'month':
        nextDate.setMonth(nextDate.getMonth() + repeatEvery);
        break;
      case 'year':
        nextDate.setFullYear(nextDate.getFullYear() + repeatEvery);
        break;
      default:
        return null;
    }
    return nextDate;
  };

  const shouldRunNow = (plan) => {
    const launchDate = new Date(plan.dateTimeLaunch);
    const now = new Date();
    return isSameMinute(launchDate, now);
  };

  cron.schedule('* * * * *', async () => {
    try {
      const response = await axios.get('http://host.docker.internal:5001/api/plans/all');
      const plans = response.data || [];

      for (const plan of plans) {
        if (!plan.valid || !plan.dateTimeLaunch) continue;

        if (shouldRunNow(plan)) {
          try {
            const launchTest = { tests: [] };

            // Préparation des tests du plan
            for (const pt of plan.planTests) {
              const resp = await axios.get('http://host.docker.internal:5001/api/tests/' + pt.testId);
              const type = resp.data.type;

              const match = type.match(/\[(.*?)\]/);
              const args = match ? match[1].split('/') : [];

              const testName = type.split('[')[0].replace(/-$/, '');

              launchTest.tests.push({
                testName,
                args
              });
            }

            // Lancement des tests
            await axios.post('http://host.docker.internal:4000/run', launchTest);

            // Si répétition configurée → mise à jour de la prochaine date de lancement
            const nextDate = getNextRunDate(plan);
            if (nextDate) {
              await axios.put(`http://host.docker.internal:5001/api/plans/${plan.id}`, {
                ...plan,
                dateTimeLaunch: nextDate
              });
            }

          } catch (err) {
            console.error(`Erreur lors de l'exécution du plan ${plan.id} :`, err.message);
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des plans :', error.message);
    }
  });
};