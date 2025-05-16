const path = require('path');
const dotenv = require('dotenv');

function loadEnv() {
    const envPath = path.resolve(__dirname, '../../.env');
    return dotenv.config({ path: envPath });
}

module.exports = { loadEnv };