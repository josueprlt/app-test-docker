const axios = require('axios');
const { getAccessToken } = require('../../utils/getAccessToken.js');
const { logSuccess } = require('../../utils/generateLogFile.js');

async function BUYERorNot(codetiers) {
    try {
        // Récupérer le token OAuth 2.0
        const accessToken = await getAccessToken();

        const url = `https://api.rec.ddfbackend.com/ref-doc-precurseur-explosif/v1/achat-precurseur-explosifs?codeTiers=${codetiers}`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.data.length > 0) {
            logSuccess('▶️  🟩 Tiers est acheteur PE', 'backend');
        } else {
            logSuccess('▶️  🟥 Tiers n\'est pas acheteur PE', 'backend');
        }
    } catch (error) {
        throw new Error(`📡❌ Échec de la requête backend BUYEUR`);
    }
}

module.exports = { BUYERorNot };
