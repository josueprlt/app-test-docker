const { GetPE } = require('../../steps/backend/getPE.js');
const { logSuccess } = require('../../utils/generateLogFile.js');

async function PEorNot(codetiers) {
    try {
        let response = await GetPE(codetiers);

        if (response.length > 0) {

            const expirationDate = new Date(response[0].dateFinValidite);
            const currentDate = new Date();
            const threeMonthsFromNow = new Date();
            threeMonthsFromNow.setMonth(currentDate.getMonth() + 3);

            if (expirationDate < currentDate) {
                logSuccess('▶️  🔸 Attestation expirée', 'backend');
            } else if (expirationDate <= threeMonthsFromNow) {
                logSuccess('▶️  🔸 Attestation valide, échéance dans -3 mois', 'backend');
            } else {
                logSuccess('▶️  🔹 Attestation valide', 'backend');
            }
        } else {
            logSuccess('▶️🟥 Tiers ne possède pas de PE', 'backend');
        }
    } catch (error) {
        throw new Error(`📡❌ Échec de la requête backend PEorNot`);
    }
}

module.exports = { PEorNot };