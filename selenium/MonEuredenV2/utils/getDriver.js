const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function getDriver() {

    let options = new chrome.Options();
    // options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--ignore-certificate-errors'); // Ignorer erreurs SSL
    options.addArguments('--disable-web-security');
    options.addArguments('--allow-insecure-localhost');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .usingServer("http://selenium-hub:4444/wd/hub")
        .build();

    return driver;
}

module.exports = { getDriver };