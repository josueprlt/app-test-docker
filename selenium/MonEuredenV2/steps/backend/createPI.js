const axios = require('axios');
const { getAccessToken } = require('../../utils/getAccessToken.js');
const { GenerateRandomUUID } = require('../../utils/generateRandomUUID.js');
const { generateError } = require('../../utils/generateError.js');
const pi = require('../../templates/pi.json');

async function CreatePI(codecontact, type) {
    try {
        if (type === 'valide') {
            let uuid = GenerateRandomUUID();
            let piJson = templatageOfPI(pi, uuid, codecontact);

            // Récupérer le token OAuth 2.0
            const accessToken = await getAccessToken();

            const url = `https://api.rec.ddfbackend.com/ref-groupe-piece-identite/v1/identite/pieces/${uuid}`;

            try {
                await axios.put(url, piJson, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            } catch (error) {
                generateError(error, `🪪❌ Échec de la création du PI avec ID ${uuid}`, 'backend');
            }
        }

    } catch (error) {
        generateError(error, '🪪❌ Échec de la création du PI', 'backend');
    }
}

function templatageOfPI(doc, uuid, codecontact) {
    let template = JSON.parse(JSON.stringify(doc));
    template.id = uuid;
    template.codeContact = `${codecontact}`;

    return template;
}

module.exports = { CreatePI };