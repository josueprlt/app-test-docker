
async function exit(driver) {
    await driver.sleep(8000);
    await driver.quit();
}

module.exports = { exit };