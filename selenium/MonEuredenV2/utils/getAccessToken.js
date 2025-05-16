const axios = require('axios');
const { styleText } = require('node:util');
const { loadEnv } = require('./loadEnv');
loadEnv();

// à utiliser avec précaution, cela désactive la vérification SSL
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Récupère le token OAuth 2.0 pour l'API backend
async function getAccessToken() {
    try {
        const response = await axios.post(
            process.env.TOKEN_URL,
            new URLSearchParams({
                grant_type: process.env.TOKEN_GRANT_TYPE,
                client_id: process.env.TOKEN_CLIENT_ID,
                client_secret: process.env.TOKEN_CLIENT_SECRET
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error(styleText(['red'], '❌ Échec de la récupération du token OAuth 2.0 :', error.message));
        throw error;
    }
}

module.exports = { getAccessToken };