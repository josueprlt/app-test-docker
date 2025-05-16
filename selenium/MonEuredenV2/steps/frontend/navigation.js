
async function navigation(url, driver) {
        // Aller sur la page de connexion
        await driver.get(url);
}

module.exports = { navigation };