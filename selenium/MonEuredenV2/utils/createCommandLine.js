
function createCommandLine(argumentsConfig) {
    const args = process.argv.slice(2);

    // Vérifier si le nombre d'arguments est correct
    if (args.length < argumentsConfig.length) {
        console.error('❌ Usage incorrect :');
        argumentsConfig.forEach(arg => {
            console.error(`<${arg.name}> : ${arg.values.join('/')}`);
        });
        process.exit(1);
    }

    // Valider chaque argument
    const parsedArgs = {};
    argumentsConfig.forEach((argConfig, index) => {
        const argValue = args[index];
        if (!argConfig.values.includes(argValue)) {
            console.error(`❌ Argument invalide pour <${argConfig.name}> : "${argValue}"`);
            console.error(`Valeurs acceptées : ${argConfig.values.join(', ')}`);
            process.exit(1);
        }
        parsedArgs[argConfig.name] = argValue;
    });

    return parsedArgs;
}

module.exports = { createCommandLine };