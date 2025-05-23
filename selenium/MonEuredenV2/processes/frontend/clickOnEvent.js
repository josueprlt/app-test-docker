const { By, until } = require('selenium-webdriver');

async function clickOnEvent(driver) {
    // Attendre que le bouton "Événements" soit cliquable et le cliquer
    const eventButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Événements"]')), 5000);
    await eventButton.click();

    // Attendre que le span "Voir les détails" soit cliquable et le cliquer
    const detailsButtons = await driver.wait(until.elementLocated(By.xpath("(//button[span[span[normalize-space(text()) = 'Voir les détails']]])[1]")), 5000);
    await detailsButtons.click();
}

module.exports = { clickOnEvent };