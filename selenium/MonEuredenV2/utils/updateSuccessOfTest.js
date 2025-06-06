const axios = require('axios');

async function updateSuccessOfTest(type) {
    const baseUrl = 'http://host.docker.internal:5001';

    try {
        // Recherche du test par type
        const { data: existingTests } = await axios.get(`${baseUrl}/api/tests/type`, {
            params: { type: type }
        });

        if (existingTests && existingTests.length > 0) {

            let success = true;
            outer: for (const test of existingTests) {
                for (const elt of test.logs) {
                    if (elt.success === false) {
                        success = false;
                        break outer;
                    }
                }
            }
            const idTest = existingTests[0].id || existingTests[0]._id;
            await axios.put(`${baseUrl}/api/tests/${idTest}`, {
                success: success
            });
        }
    } catch (error) {
        console.error('❌ Erreur inattendue lors de la récupération du test :', error.message);
    }
}

module.exports = { updateSuccessOfTest };