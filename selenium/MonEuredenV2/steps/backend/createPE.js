const axios = require('axios');
const FormData = require('form-data');
const { getAccessToken } = require('../../utils/getAccessToken.js');
const { GenerateRandomUUID } = require('../../utils/generateRandomUUID.js');
const { generateError } = require('../../utils/generateError.js');
const pe = require('../../templates/pe.json');

async function CreatePE(codetiers, type) {
    try {
        let uuid = GenerateRandomUUID();
        let peJson = templatageOfPE(pe, uuid, codetiers, type);

        // Récupérer le token OAuth 2.0
        const accessToken = await getAccessToken();

        const url = `https://api.rec.ddfbackend.com/ref-doc-precurseur-explosif/v1/doc-precurseur-explosifs/${uuid}`;

        // Créer un objet FormData
        const formData = new FormData();
        formData.append('metadata', JSON.stringify(peJson), {
            contentType: 'application/json'
        });

        try {
            await axios.put(url, formData, {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        } catch (error) {
            generateError(error, `📄❌ Échec de la création du PE avec ID ${uuid}`, 'backend');
        }
        
    } catch (error) {
        generateError(error, '📄❌ Échec de la création des PE', 'backend');
    }
}

function templatageOfPE(doc, uuid, codetiers, type) {
    let signature;
    let finValide;

    if (type === 'actif') {
        signature = new Date().toISOString();
        finValide = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();
    }
    else if (type === 'echeance') {
        signature = new Date(new Date().setFullYear(new Date().getFullYear() - 1, new Date().getMonth() + 2)).toISOString();
        finValide = new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString();
    }
    else if (type === 'expire') {
        signature = new Date(new Date().setFullYear(new Date().getFullYear() - 1, new Date().getMonth() - 1)).toISOString();
        finValide = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString();
    }

    let template = JSON.parse(JSON.stringify(doc));
    template.id = uuid;
    template.codeTiers = `${codetiers}`;
    template.dateSignature = signature;
    template.dateFinValidite = finValide;

    return template;
}

module.exports = { CreatePE };