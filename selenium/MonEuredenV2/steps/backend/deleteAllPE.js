const axios = require('axios');
const {getAccessToken} = require('../../utils/getAccessToken.js');
const {generateError} = require('../../utils/generateError.js');
const {GetPE} = require('./getPE.js');

async function DeleteAllPE(codetiers) {
    try {
        let AllPE = await GetPE(codetiers);

        // Récupérer le token OAuth 2.0
        const accessToken = await getAccessToken();

        // Supprimer chaque PE de manière asynchrone
        for (const pe of AllPE) {
            const url = `https://api.rec.ddfbackend.com/ref-doc-precurseur-explosif/v1/doc-precurseur-explosifs/${pe.id}`;

            try {
                await axios.delete(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // La PI a déjà été supprimée, on ignore
                    console.warn(`📄 PE déjà supprimée : ID ${pe.id}`);
                } else {
                    // Autres erreurs à remonter
                    generateError(error, `📄❌ Échec de la suppression du PE avec ID ${pe.id}`, 'backend');
                }
            }
        }

    } catch (error) {
        generateError(error, '📄❌ Échec de la supression des PE', 'backend');
    }
}

module.exports = {DeleteAllPE};