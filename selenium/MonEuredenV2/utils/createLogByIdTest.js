const axios = require('axios');

async function createLogByIdTest(message, type, provenance, success) {
    const baseUrl = 'http://host.docker.internal:5001';

    try {
        // Recherche du test par type
        const { data: existingTests } = await axios.get(`${baseUrl}/api/tests/type/${type}`);

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
        console.error(`❌ Erreur inattendue lors de la création du log :`, error.message);
    }
}

module.exports = { createLogByIdTest };