const { By, until } = require('selenium-webdriver');

async function evenementsPage(driver) {
    // Attendre que le bouton "Événements" soit cliquable et le cliquer
    const eventButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Événements"]')), 30000);
    await eventButton.click();
}

module.exports = { evenementsPage };