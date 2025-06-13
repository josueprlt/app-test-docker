const axios = require('axios');

async function createTest(name, description, type, success = null) {
    const baseUrl = 'http://host.docker.internal:5001/api/tests';

    try {
        // 1. Invalider les anciens tests du même type
        await axios.put(`${baseUrl}/type/invalidate`, { type });

        // 2. Créer le nouveau test
        const creationResponse = await axios.post(baseUrl, {
            name,
            description,
            type,
            success
        });

        const newTest = creationResponse.data;
        const newTestId = newTest._id || newTest.id;

        console.log('✅ Nouveau test créé avec ID :', newTestId);

        // 3. Récupérer tous les anciens tests invalides du même type
        const allTests = await axios.get(`${baseUrl}/all`);
        const oldTests = allTests.data.filter(
            t => t.type === type && t.valid === false && (t._id || t.id) !== newTestId
        );

        // 4. Mettre à jour chaque PlanTest en appelant ta route /api/plans/update
        for (const oldTest of oldTests) {
            const oldTestId = oldTest._id || oldTest.id;
            try {
                await axios.post('http://host.docker.internal:5001/api/plans/update', {
                    type: type,
                    testId: oldTestId
                });
            } catch (updateError) {
                console.error(`❌ Échec mise à jour PlanTest pour ${oldTestId}:`, updateError.response?.data || updateError.message);
            }
        }
    } catch (error) {
        console.error('❌ Erreur globale dans createTest:', error.response?.data || error.message);
    }
}

module.exports = { createTest };