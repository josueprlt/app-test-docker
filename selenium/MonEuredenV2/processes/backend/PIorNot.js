const { GetPI } = require('../../steps/backend/getPI.js');
const { logSuccess } = require('../../utils/generateLogFile.js');

async function PIorNot( codecontact ) {
    try {
        let response = await GetPI(codecontact);        

        if (response.length > 0) {
            logSuccess('▶️  🟩 Contact a une PI', 'backend');
        } else {
            logSuccess('▶️  🟥 Contact n\'a pas de PI', 'backend');
        }
    } catch (error) {
        throw new Error(`📡❌ Échec de la requête backend PIorNot`);
    }
}

module.exports = { PIorNot };