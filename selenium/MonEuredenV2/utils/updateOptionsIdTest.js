const axios = require('axios');

async function updateOptionsIdTest(type) {
    const baseUrl = 'http://host.docker.internal:5001';

    try {
        const { data } = await axios.get(`${baseUrl}/api/tests/type/all/${type}`);
        newID = data[0].id;
        oldID = data[1].id;

        await axios.post(`${baseUrl}/api/tests/update-options`, {
            oldTestId: oldID,
            newTestId: newID
        });

    } catch (error) {
        console.error('❌ Erreur inattendue lors du transfert des options du test :', error.message);
    }
}

module.exports = { updateOptionsIdTest };