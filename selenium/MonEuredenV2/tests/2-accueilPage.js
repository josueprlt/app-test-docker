const { executeStep } = require('../utils/executeStep.js');
const { navigation } = require('../steps/frontend/navigation');
const { login } = require('../steps/frontend/login');
const { exit } = require('../steps/frontend/exit');
const { generateError } = require('../utils/generateError.js');
const { getDriver } = require('../utils/getDriver.js');
const { getConnexion } = require('../utils/getConnexion.js');
const { GetPE } = require('../steps/backend/getPE.js');
const { waitForSelenium } = require('../../waitForSelenium.js');

async function desk_homePage() {
    await waitForSelenium();

    let driver = await getDriver();
    let connexion = getConnexion();

    try {
        await executeStep(
            () => navigation(connexion.MonEuredenV2.url, driver),
            '✅ 1/3 : Navigation réussie',
            '❌ 1/3 : Échec de la navigation'
        );

        await executeStep(
            () => login(connexion.MonEuredenV2.mail, connexion.MonEuredenV2.password, driver),
            '✅ 2/3 : Connexion réussie',
            '❌ 2/3 : Échec de la connexion'
        );

        await executeStep(
            () => GetPE(connexion.MonEuredenV2.codeTiers),
            '📡✅ getPE réussi',
            '📡❌ Échec de la requête getPE'
        );

    } catch (err) {
        generateError(err, '❌ Erreur lors de l\'exécution du script');
    } finally {
        await executeStep(
            () => exit(driver),
            '✅ 3/3 : Navigateur fermé',
            '❌ 3/3 : Échec de la fermeture du navigateur'
        );
    }
}

desk_homePage();