const {executeStep} = require('../utils/executeStep.js');
const {navigation} = require('../steps/frontend/navigation');
const {login} = require('../steps/frontend/login');
const {exit} = require('../steps/frontend/exit');
const {generateError} = require('../utils/generateError.js');
const {getDriver} = require('../utils/getDriver.js');
const {getConnexion} = require('../utils/getConnexion.js');
const {waitForSelenium} = require('../utils/waitForSelenium.js');
const {createTest} = require('../utils/createTest.js');
const {updateSuccessOfTest} = require('../utils/updateSuccessOfTest.js');
const {navigationStep} = require('../steps/frontend/navigationStep.js');

async function EvenementsPage() {
    const type = "4-evenementsPage";
    await waitForSelenium();
    await createTest(
        "Parcours vers les Événements",
        "Vérifie le parcours utilisateur permettant de se rendre jusqu'à la page des événements par rapport à l'application MonEureden V2",
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
            () => login(connexion.MonEuredenV2.mail, connexion.MonEuredenV2.password, driver),
            '🎨✅ Connexion réussie',
            '🎨❌ Échec de la connexion',
            'Frontend',
            type
        );

        await executeStep(
            () => navigationStep(driver, 'Événements'),
            '✅ Clic sur la page événement réussie',
            '❌ Échec du clic sur la page événement',
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

EvenementsPage();