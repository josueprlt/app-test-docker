const { loadEnv } = require('./loadEnv');
loadEnv();

function getConnexion() {
    const connexion = {
        MonEuredenV2: {
            url: process.env.MEV2_URL,
            mail: process.env.MEV2_MAIL,
            password: process.env.MEV2_PASSWORD,
            codeTiers: process.env.MEV2_CODETIERS,
            codeContact: process.env.MEV2_CODECONTACT,
            seller: {
                mail: process.env.MEV2_SELLER_MAIL,
                password: process.env.MEV2_SELLER_PASSWORD,
                codeTiers: process.env.MEV2_SELLER_CODETIERS,
                codeContact: process.env.MEV2_SELLER_CODECONTACT
            }
        },
        Mosaik: {
            url: process.env.MOSAIK_URL,
            login: process.env.MOSAIK_LOGIN,
            password: process.env.MOSAIK_PASSWORD
        }
    }

    return connexion;
}

module.exports = { getConnexion };