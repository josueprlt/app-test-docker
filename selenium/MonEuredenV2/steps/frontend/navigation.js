const { generateError } = require('../../utils/generateError.js');

async function navigation(url, driver) {
        try {
                // Aller sur la page de connexion
                await driver.get(url);
        } catch (error) {
                generateError(error, '');
        }
}

module.exports = { navigation };