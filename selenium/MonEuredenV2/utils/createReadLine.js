const readline = require('node:readline');
const { styleText } = require('node:util');

async function createReadLine(question, response, delay = 15000, values = []) {
    return new Promise((resolve, reject) => {
        try {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            const timeout = setTimeout(() => {
                console.log('⏳ Temps écoulé. Aucune réponse reçue.');
                rl.close();
                resolve(null);
            }, delay);

            let formattedQuestion;
            values.forEach((value, index) => {
                if (index === 0) {
                    formattedQuestion = `(${value}, `;
                } else if (index === values.length - 1) {
                    formattedQuestion = `${value})`;
                } else {
                    formattedQuestion = `${value}, `;
                }
                question = question + formattedQuestion;
            });

            rl.question('\n\n'+question+'\n', (elt) => {
                clearTimeout(timeout);
                rl.close();

                if (values.length > 0 && values.includes(elt.trim().toLowerCase())) {
                    resolve(elt.trim().toLowerCase());
                } else {
                    console.log(styleText(['red'], '❌ Réponse invalide ou non reconnue.'));
                    resolve(null);
                }
            });
        } catch (error) {
            console.error(styleText(['red'], '❌ Échec de la création ligne de texte :', error.message));
            reject(error);
        }
    });
}

module.exports = { createReadLine };