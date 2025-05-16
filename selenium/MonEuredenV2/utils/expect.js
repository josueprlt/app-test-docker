const { executeStep } = require('./executeStep.js');

function expect(condition, response, prv) {
    if (!condition) {
        throw new Error("📰🔴 Assertion échouée : Le texte renseigné ne correspond pas à la valeur attendue.");
    } else {
        executeStep(null, `📰🟢 ${response}`, '📰🔴 Assertion échouée : Le texte renseigné ne correspond pas à la valeur attendue.', prv);
    }
}

module.exports = { expect };