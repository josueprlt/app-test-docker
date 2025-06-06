const axios = require('axios');

async function createTest(name, description, type, success = null) {
    const baseUrl = 'http://host.docker.internal:5001/api/tests';

    try {
        // Mettre à jour tous les tests du même type pour passer 'valid' à false
        await axios.put(`${baseUrl}/type/invalidate`, {
            type: type
        });

        await axios.post(`${baseUrl}`, {
            name: name,
            description: description,
            type: type,
            success: success
        });
    } catch (error) {
        console.error('Erreur lors de la création du test:', error.response ? error.response.data : error.message);
    }
}

module.exports = { createTest };