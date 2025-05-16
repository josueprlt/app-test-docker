const { logError } = require('./generateLogFile.js');

function generateError(err, msg) {
    const errorMessage = err && err.message ? err.message : 'Erreur inconnue';
    logError(`${msg} ${errorMessage}`);
    console.error(`${msg} ${errorMessage}`);
    throw new Error(`${msg} ${errorMessage}`);
}

module.exports = { generateError };