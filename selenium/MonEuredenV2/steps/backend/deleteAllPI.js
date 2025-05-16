const axios = require('axios');
const { getAccessToken } = require('../../utils/getAccessToken.js');
const { generateError } = require('../../utils/generateError.js');
const { GetPI } = require('./getPI.js');

async function DeleteAllPI(codecontact) {
    try {
        let AllPI = await GetPI(codecontact);

        // Récupérer le token OAuth 2.0
        const accessToken = await getAccessToken();

        // Supprimer chaque PI de manière asynchrone
        for (const pi of AllPI) {
            const url = `https://api.rec.ddfbackend.com/ref-groupe-piece-identite/v1/identite/pieces/${pi.id}`;

            try {
                await axios.delete(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            } catch (error) {
                generateError(error, `🪪❌ Échec de la suppression du PI avec ID ${pi.id}`, 'backend');
            }
        }

    } catch (error) {
        generateError(error, '🪪❌ Échec de la supression des PI', 'backend');
    }
}

module.exports = { DeleteAllPI };