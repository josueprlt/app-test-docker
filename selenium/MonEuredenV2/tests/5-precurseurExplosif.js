const axios = require('axios');
const { executeStep } = require('../utils/executeStep.js');
const { navigation } = require('../steps/frontend/navigation.js');
const { login } = require('../steps/frontend/login.js');
const { exit } = require('../steps/frontend/exit.js');
const { generateError } = require('../utils/generateError.js');
const { getDriver } = require('../utils/getDriver.js');
const { getConnexion } = require('../utils/getConnexion.js');
const { waitForSelenium } = require('../utils/waitForSelenium.js');
const { createTest } = require('../utils/createTest.js');
const { updateSuccessOfTest } = require('../utils/updateSuccessOfTest.js');
const { updateOptionsIdTest } = require('../utils/updateOptionsIdTest.js');
const { PEbackProcessus } = require('../processes/backend/precurseurExplosif.js');
const { pe_processus } = require('../processes/frontend/precurseurExplosif.js');
const { createCommandLine } = require('../utils/createCommandLine.js');

async function PrecurseurExplosif(defaultSeller, defaultPI, defaultPE) {
    const type = "5-precurseurExplosif";
    await waitForSelenium();
    await createTest(
        "Parcours Signature Précurseur Explosif",
        "Vérifie le parcours de signature d'un précurseur explosif dans l'application MonEureden V2",
        type
    );

    let driver = await getDriver();
    let connexion = getConnexion();

    let codeTiers;
    let codeContact;
    let mail;
    let password;

    try {
        if (defaultSeller === 'oui') {
            codeTiers = connexion.MonEuredenV2.seller.codeTiers;
            codeContact = connexion.MonEuredenV2.seller.codeContact;
            mail = connexion.MonEuredenV2.seller.mail;
            password = connexion.MonEuredenV2.seller.password;
        }
        else if (defaultSeller === 'non') {
            codeTiers = connexion.MonEuredenV2.codeTiers;
            codeContact = connexion.MonEuredenV2.codeContact;
            mail = connexion.MonEuredenV2.mail;
            password = connexion.MonEuredenV2.password;
        }

        await executeStep(
            () => PEbackProcessus(codeTiers, codeContact, defaultPI, defaultPE, type),
            '📡✅ Requêtes back réussi avec succès',
            '📡❌ Erreur sur les requêtes back',
            'Backend',
            type
        );

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
            () => pe_processus(driver, defaultSeller, defaultPI, defaultPE, type),
            '📄✅ Processus PE exécuté avec succès',
            '📄❌ Échec du processus PE',
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
        await updateOptionsIdTest(type);
    }
}

const argumentsConfig = [
    { name: 'seller', values: ['oui', 'non'] },
    { name: 'etatPI', values: ['valide', 'expire'] },
    { name: 'etatPE', values: ['actif', 'echeance', 'expire'] }
]

const parsedArgs = createCommandLine(argumentsConfig);

PrecurseurExplosif(parsedArgs.seller, parsedArgs.etatPI, parsedArgs.etatPE);