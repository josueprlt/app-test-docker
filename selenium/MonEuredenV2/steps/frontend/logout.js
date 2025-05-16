const { By, until } = require('selenium-webdriver');

async function logout(driver) {
    // Attendre que le bouton de profil soit cliquable et le cliquer
    const profilButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Prenom Nom"]')), 15000);
    await profilButton.click();

    // Attendre que le bouton de déconnexion soit cliquable et le cliquer
    let deconnexionDiv = await driver.findElement(By.xpath("//div[contains(text(), 'Déconnexion')]"), 15000);
    await deconnexionDiv.click();
}

module.exports = { logout };