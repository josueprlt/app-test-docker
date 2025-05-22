const axios = require('axios');
const { logSuccess } = require('./generateLogFile.js');
const { generateError } = require('./generateError.js');
const { createLogByIdTest } = require('../utils/createLogByIdTest.js');

async function executeStep(stepFunction, successMessage, errorMessage, prv, type) {

    try {
        if (typeof stepFunction === 'function') {
            await stepFunction();
        }

        logSuccess(successMessage, prv);
        await createLogByIdTest(successMessage, type, prv, true);
        
    } catch (err) {
        await createLogByIdTest(errorMessage + ' ' + err, type, prv, false);
        generateError(err, errorMessage, prv);
    }
}

module.exports = { executeStep };