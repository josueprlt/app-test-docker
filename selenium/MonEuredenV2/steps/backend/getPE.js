const axios = require('axios');
const { getAccessToken } = require('../../utils/getAccessToken.js');
const { generateError } = require('../../utils/generateError.js');

async function GetPE( codetiers ) {
    try {
        // Récupérer le token OAuth 2.0
        const accessToken = await getAccessToken();

        const url = `https://api.rec.ddfbackend.com/ref-doc-precurseur-explosif/v1/doc-precurseur-explosifs?code-tiers=${codetiers}`;

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.data.length > 0) {
            return response.data
        } else {
            return []
        }
        
    } catch (error) {
        generateError(error, '📡❌ Échec de la requête backend', 'backend');
    }
}

module.exports = { GetPE };