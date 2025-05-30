const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const options = require('../../../options');

const testsDir = __dirname;

// Liste des fichiers de test à exclure
const excludedTests = options.options.excludedTests;

const testFiles = fs.readdirSync(testsDir)
    .filter(file => file.endsWith('.js') && file !== path.basename(__filename))
    .filter(file => !excludedTests.includes(file));

function generateCombinations() {
    const sellers = ['oui', 'non'];
    const etatPIs = ['valide', 'expire'];
    const etatPEs = ['actif', 'echeance', 'expire'];

    const combinations = [];
    sellers.forEach(seller => {
        etatPIs.forEach(etatPI => {
            etatPEs.forEach(etatPE => {
                combinations.push({ seller, etatPI, etatPE });
            });
        });
    });
    return combinations;
}

// Lancer chaque test un par un
testFiles.forEach(testFile => {
    const testPath = path.join(testsDir, testFile);
    console.log(`\n\n🚀 Lancement du test ${testFile}`);
    try {
        if (testFile === '5-precurseurExplosif.js') {
            
            const combinations = generateCombinations();
            combinations.forEach(({ seller, etatPI, etatPE }) => {
                console.log(`\n🔄 Exécution avec paramètres : seller=${seller}, etatPI=${etatPI}, etatPE=${etatPE}`);
                execSync(`node --no-warnings "${testPath}" ${seller} ${etatPI} ${etatPE}`, { stdio: 'inherit' });
            });
        } else {

            execSync(`node --no-warnings "${testPath}"`, { stdio: 'inherit' });
        }
        console.log(`✅ Test ${testFile} terminé avec succès`);
    } catch (error) {
        console.error(`❌ Échec du test ${testFile}`);
        console.error(error.message);
    }
});