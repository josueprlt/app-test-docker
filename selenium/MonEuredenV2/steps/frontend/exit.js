const { generateError } = require('../../utils/generateError.js');

async function exit(driver) {
    try {
        await driver.sleep(8000);
        await driver.quit();
    } catch (error) {
        generateError(error, '');
    }
}

module.exports = { exit };