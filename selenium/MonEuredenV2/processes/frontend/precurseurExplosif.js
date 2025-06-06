const { By, until } = require('selenium-webdriver');
const { documentPage } = require('./docuPage');
const { expect } = require('../../utils/expect.js');
const { executeStep } = require('../../utils/executeStep.js');
const { generateError } = require('../../utils/generateError.js');

async function pe_processus(driver, seller, etatPI, etatPE, type) {
    try {
        if (seller === 'oui') {

            if (etatPE !== 'actif') {
                await TestBandeauPE(driver, etatPE, seller, type);

                const SeeMoreButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Voir Plus"]')), 5000);
                await SeeMoreButton.click();

                if (etatPI === 'valide') {
                    const CheckboxButton = await driver.wait(until.elementLocated(By.xpath('//input[@value="caseCochee"]')), 15000);
                    await driver.executeScript('arguments[0].click();', CheckboxButton);

                    const NextButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Suivant"]')), 15000);
                    await NextButton.click();
                } else if (etatPI === 'expire') {
                    const UpdatePIButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Mettre à jour ma pièce d\'identité"]')), 15000);
                    await UpdatePIButton.click();

                    const spanIDNOWLink = await driver.wait(until.elementLocated(By.xpath('//span[text()="Continuez ici dans votre navigateur."]')), 10000);
                    await spanIDNOWLink.click();
                }
            } else {
                executeStep(null, '✅ Rien à faire : PE déjà actif', '❌ Erreur concernant l\'état du PE', 'Frontend', type);
            }

        } else if (seller === 'non') {

            if (etatPE !== 'actif') {
                await TestBandeauPE(driver, etatPE, seller, type);

                await documentPage(driver);

                const CertificatButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Certificats"]')), 5000);
                await CertificatButton.click();

                const PEButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Signer une attestation précurseurs d\'explosifs"]')), 5000);
                await PEButton.click();

                if (etatPI === 'valide') {
                    const CheckboxButton = await driver.wait(until.elementLocated(By.xpath('//input[@value="caseCochee"]')), 15000);
                    await driver.executeScript('arguments[0].click();', CheckboxButton);

                    const NextButton = await driver.wait(until.elementLocated(By.xpath('//button[@label="Suivant"]')), 15000);
                    await NextButton.click();
                } else if (etatPI === 'expire') {
                    const UpdatePIButton = await driver.wait(until.elementLocated(By.xpath(`//button[@label="Mettre à jour ma pièce d'identité"]`)), 15000);
                    await UpdatePIButton.click();

                    const spanIDNOWLink = await driver.wait(until.elementLocated(By.xpath('//span[text()="Continuez ici dans votre navigateur."]')), 10000);
                    await spanIDNOWLink.click();
                }
            } else {
                executeStep(null, '✅ Rien à faire : PE déjà actif', '❌ Erreur concernant l\'état du PE', 'Frontend', type);
            }
        }
    } catch (error) {
        generateError(error, '');
    }
}

async function TestBandeauPE(driver, etatPE, seller, type) {
    let expectedTitleExpire = "Votre attestation n'est plus valide";
    let expectedDescExpire = "veuillez mettre à jour votre attestation de précurseurs d'explosifs";
    let expectedTitleEcheance = "Votre attestation arrive à expiration";
    let expectedDescEcheance = "veuillez mettre à jour votre attestation de précurseurs d'explosifs";

    if (seller === 'non') {
        executeStep(null, '📰🟢 Aucun bandeau attendu : PE est actif.', '📰🔴 Erreur sur l\'attendu du bandeau.', 'Frontend');
        return;
    }

    try {
        const bandeauTitle = await driver.wait(
            until.elementLocated(By.xpath('.//div[@class="su-widget su-widget-su-text"]/div[@class="su-text text-left"]')),
            15000
        );
        const titlteText = await bandeauTitle.getText();

        const bandeauDesc = await driver.wait(
            until.elementLocated(By.xpath('.//div[@class="su-text text-left"]/p')),
            15000
        );
        const DescText = await bandeauDesc.getText();

        if (etatPE === 'expire') {
            expect(titlteText === expectedTitleExpire, 'Titre bandeau PE correct.', 'Frontend', type);
            expect(DescText === expectedDescExpire, 'Description bandeau PE correct.', 'Frontend', type);
        } else if (etatPE === 'echeance') {
            expect(titlteText === expectedTitleEcheance, 'Titre bandeau PE correct.', 'Frontend', type);
            expect(DescText === expectedDescEcheance, 'Description bandeau PE correct.', 'Frontend', type);
        }
    } catch (error) {
        generateError(error, '❌ Erreur lors de la vérification du bandeau PE :');
    }
}

module.exports = { pe_processus };