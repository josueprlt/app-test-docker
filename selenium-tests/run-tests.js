const axios = require('axios');

async function waitForAPI(url, retries = 10, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (err) {
            console.log(`🔄 Tentative ${i + 1} : API pas encore prête`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("❌ L'API n'a pas répondu à temps.");
}

(async () => {
    try {
        const data = await waitForAPI(`${process.env.BACKURL}/api/tests`);
        console.log("✅ Requête envoyée :", data);
    } catch (err) {
        console.error(err.message);
    }
})();