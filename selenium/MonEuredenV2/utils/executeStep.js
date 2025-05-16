const { logSuccess } = require('./generateLogFile.js');
const { generateError } = require('./generateError.js');

async function executeStep(stepFunction, successMessage, errorMessage, prv) {
    try {
        if (typeof stepFunction === 'function') {
            await stepFunction();
        }
        logSuccess(successMessage, prv);
    } catch (err) {
        generateError(err, errorMessage, prv);
    }
}

module.exports = { executeStep };