const { executeStep } = require('../../utils/executeStep.js');
const { PIorNot } = require('./PIorNot');
const { PEorNot } = require('./PEorNot');
const { BUYERorNot } = require('./BUYERorNot');
const { DeleteAllPE } = require('../../steps/backend/deleteAllPE.js');
const { DeleteAllPI } = require('../../steps/backend/deleteAllPI.js');
const { CreatePI } = require('../../steps/backend/createPI.js');
const { CreatePE } = require('../../steps/backend/createPE.js');
const { generateError } = require('../../utils/generateError.js');

async function PEbackProcessus(codetiers, codecontact, defaultPI, defaultPE, type) {
    try {
        await executeStep(
            () => DeleteAllPI(codecontact),
            '🗑️✅ Suppression de toutes les PIs réussie',
            '🗑️❌ Échec de la suppression de toutes les PIs',
            'Backend',
            type
        );

        await executeStep(
            () => DeleteAllPE(codetiers),
            '🗑️✅ Suppression de toutes les PEs réussie',
            '🗑️❌ Échec de la suppression de toutes les PEs',
            'Backend',
            type
        );

        await executeStep(
            () => CreatePI(codecontact, defaultPI),
            '🪪✅ Création de la PI réussie',
            '🪪❌ Échec de la création de la PI',
            'Backend',
            type
        );

        await executeStep(
            () => CreatePE(codetiers, defaultPE),
            '📄✅ Création de la PE réussie',
            '📄❌ Échec de la création de la PE',
            'Backend',
            type
        );

        await executeStep(
            () => BUYERorNot(codetiers),
            '📡✅ Test si acheteur ou pas réussi',
            '📡❌ Échec de la requête backend BUYER',
            'Backend',
            type
        );

        await executeStep(
            () => PIorNot(codecontact),
            '📡✅ Test si PI valide ou pas réussi',
            '📡❌ Échec de la requête backend PIorNot',
            'Backend',
            type
        );

        await executeStep(
            () => PEorNot(codetiers),
            '📡✅ Test si PE valide ou pas réussi',
            '📡❌ Échec de la requête backend PEorNot',
            'Backend',
            type
        );

    } catch (err) {
        generateError(err, 'Erreur dans le processus PE back :');
    }
}

module.exports = { PEbackProcessus };