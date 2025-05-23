const { By, until } = require('selenium-webdriver');

async function creationCompte(driver, firstname, name, mail, mobile) {
    const createCompteLink = await driver.wait(until.elementLocated(By.xpath('//a[text()="Cliquez ici pour vous en créer un."]')), 5000);
    await createCompteLink.click();

    const startButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Commencer"]')), 5000);
    await startButton.click();


    const usernameField = await driver.wait(until.elementLocated(By.name('prenom')), 5000);
    await usernameField.sendKeys(firstname);

    const nameField = await driver.wait(until.elementLocated(By.name('nom')), 5000);
    await nameField.sendKeys(name);

    const emailField = await driver.wait(until.elementLocated(By.name('mail')), 5000);
    await emailField.sendKeys(mail);

    const mobileField = await driver.wait(until.elementLocated(By.name('mobile')), 5000);
    await mobileField.sendKeys(mobile);

    const submitButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Suivant >"]')), 5000);
    await submitButton.click();


    const idNowLink = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Continuez ici dans votre navigateur.")]')), 5000);
    await idNowLink.click();
}

module.exports = { creationCompte };