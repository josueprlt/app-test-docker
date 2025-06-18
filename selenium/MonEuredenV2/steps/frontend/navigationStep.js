const { By, until } = require('selenium-webdriver');

async function navigationStep(driver, label) {
    // Attendre que le bouton avec label choisis soit cliquable et le cliquer
    const ButtonNav = await driver.wait(until.elementLocated(By.xpath(`//button[@label="${label}"]`)), 15000);
    await ButtonNav.click();
}

module.exports = { navigationStep };