const axios = require('axios');

async function createLogByIdTest(message, type, provenance, success) {
    const baseUrl = 'http://host.docker.internal:5001';

    try {
        // Recherche du test par type (GET avec params)
        const { data: existingTests } = await axios.get(`${baseUrl}/api/tests/type`, {
            params: { type: type }
        });

        if (existingTests && existingTests.length > 0) {
            const idTest = existingTests[0].id || existingTests[0]._id;
            await axios.post(`${baseUrl}/api/logs`, {
                testId: idTest,
                message: message,
                provenance: provenance,
                success: success
            });
        }
    } catch (error) {
        if (error.response) {
            console.error(`❌ Erreur lors de la création du log :`, error.message, error.response.data);
        } else {
            console.error(`❌ Erreur inattendue lors de la création du log :`, error.message);
        }
    }
}

module.exports = { createLogByIdTest };