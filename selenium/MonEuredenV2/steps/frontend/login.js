const { By, until } = require('selenium-webdriver');

async function login(mail, password, driver) {
    // Attendre que le champ 'username' soit visible et le remplir
    const usernameField = await driver.wait(until.elementLocated(By.name('username')), 30000);
    await usernameField.sendKeys(mail);

    // Attendre que le champ 'password' soit visible et le remplir
    const passwordField = await driver.wait(until.elementLocated(By.name('password')), 30000);
    await passwordField.sendKeys(password);

    // Attendre que le bouton de soumission soit cliquable et le cliquer
    const submitButton = await driver.wait(until.elementLocated(By.id('kc-login')), 30000);
    await submitButton.click();
}

module.exports = { login };