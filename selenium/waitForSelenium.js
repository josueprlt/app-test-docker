const axios = require('axios');

async function waitForSelenium() {
    const url = 'http://selenium:4444/wd/hub/status';
    for (let i = 0; i < 10; i++) {
        try {
            const res = await axios.get(url);
            if (res.data.value.ready) {
                console.log('✅ Selenium Grid is ready!');
                return;
            }
        } catch (e) {
            console.log('⏳ Waiting for Selenium...');
        }
        await new Promise(r => setTimeout(r, 2000));
    }
    throw new Error('❌ Selenium Grid not ready after timeout');
}

module.exports = { waitForSelenium };