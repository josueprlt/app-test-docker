const axios = require('axios');

async function getTests() {
    const baseUrl = 'http://host.docker.internal:5001/api/tests';

    try {
        await axios.get(baseUrl);
    } catch (error) {
        console.error('Erreur lors de la récupération des test valides :', error.response ? error.response.data : error.message);
    }
}

module.exports = { getTests };