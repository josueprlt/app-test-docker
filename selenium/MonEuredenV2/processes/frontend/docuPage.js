const { By, until } = require('selenium-webdriver');

async function documentPage(driver) {
    // Attendre que le bouton "Événements" soit cliquable et le cliquer
    const eventButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Documents"]')), 30000);
    await eventButton.click();
}

module.exports = { documentPage };