const axios = require('axios');
const { executeStep } = require('../utils/executeStep.js');
const { navigation } = require('../steps/frontend/navigation.js');
const { creationCompte } = require('../processes/frontend/creationCompte.js');
const { exit } = require('../steps/frontend/exit.js');
const { generateError } = require('../utils/generateError.js');
const { getDriver } = require('../utils/getDriver.js');
const { getConnexion } = require('../utils/getConnexion.js');
const { waitForSelenium } = require('../utils/waitForSelenium.js');
const { createTest } = require('../utils/createTest.js');
const { updateSuccessOfTest } = require('../utils/updateSuccessOfTest.js');

async function CreationCompte() {
    const type = `6-creationCompte`;
    await waitForSelenium();
    await createTest(
        `Création de Compte`,
        "Vérifie le parcours de création de compte dans l'application MonEureden V2",
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

        await executeStep(
            () => creationCompte(driver, 'test', 'retest', 'mailto@mailto.fr', '0606060606'),
            '✅ Clic sur le lien de création de compte réussi',
            '❌ Échec du clic sur le lien de création de compte',
            'frontend'
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

CreationCompte();