const { executeStep } = require('../utils/executeStep.js');
const { navigation } = require('../steps/frontend/navigation');
const { login } = require('../steps/frontend/login');
const { exit } = require('../steps/frontend/exit');
const { generateError } = require('../utils/generateError.js');
const { getDriver } = require('../utils/getDriver.js');
const { getConnexion } = require('../utils/getConnexion.js');
const { waitForSelenium } = require('../utils/waitForSelenium.js');
const { createTest } = require('../utils/createTest.js');
const { updateSuccessOfTest } = require('../utils/updateSuccessOfTest.js');

async function LoginPage() {
    const type = "1-loginPage";
    await waitForSelenium();
    await createTest(
        "Parcours de Navigation",
        "Vérifie simplement que la navigation vers l'url de MEV2 est correcte et fonctionne.",
        type
    );

    let driver = await getDriver();
    let connexion = getConnexion();

    try {
        await executeStep(
            () => navigation(connexion.MonEuredenV2.url, driver),
            '🚢✅ Navigation réussie',
            '🚢❌ Échec de la navigation',
            'Frontend',
            type
            
        );

    } catch (err) {
        generateError(err, '❌ Erreur lors de l\'exécution du script');
    } finally {
        await executeStep(
            () => exit(driver),
            '🎨✅ Navigateur fermé',
            '🎨❌ Échec de la fermeture du navigateur',
            'Frontend',
            type
        );
        await updateSuccessOfTest(type);
    }
}

LoginPage();