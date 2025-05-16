const { waitForSelenium } = require('./waitForSelenium');
const { getDriver } = require('./MonEuredenV2/utils/getDriver');
const { getConnexion } = require('./MonEuredenV2/utils/getConnexion');

(async () => {
    await waitForSelenium();

    let driver = await getDriver();
    let connexion = getConnexion();
    
    try {
        await driver.get(connexion.MonEuredenV2.url);
        const title = await driver.getTitle();
        console.log('✅ Page title is:', title);
    } catch (err) {
        console.error('❌ Test failed:', err);
    } finally {
        await driver.quit();
    }
})();



// const { desk_homePage } = require('./MonEuredenV2/tests/2-accueilPage');

// desk_homePage();