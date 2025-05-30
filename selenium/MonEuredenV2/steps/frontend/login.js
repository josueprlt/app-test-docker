const { By, until } = require('selenium-webdriver');
const { generateError } = require('../../utils/generateError.js');

async function login(mail, password, driver) {
    try {
        // Attendre que le champ 'username' soit visible et le remplir
        const usernameField = await driver.wait(until.elementLocated(By.name('username')), 15000);
        await usernameField.sendKeys(mail);

        // Attendre que le champ 'password' soit visible et le remplir
        const passwordField = await driver.wait(until.elementLocated(By.name('password')), 15000);
        await passwordField.sendKeys(password);

        // Attendre que le bouton de soumission soit cliquable et le cliquer
        const submitButton = await driver.wait(until.elementLocated(By.id('kc-login')), 15000);
        await submitButton.click();

        const AgreeButton = await driver.wait(until.elementLocated(By.id('didomi-notice-agree-button')), 30000);
        await AgreeButton.click();
    } catch (error) {
        generateError(error, '');
    }
}

module.exports = { login };