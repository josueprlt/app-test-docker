module.exports = async (db) => {
    const { Test } = db;
    const { Log } = db;

    await Test.create({
        name: 'Parcours de connexion',
        description: 'Ce parcours teste la connexion à l\'application.',
        type: '2-accueilPage',
        success: true
    });
    
    await Log.create({
        testId: 1,
        message: '1/3 Test réussi exemple !',
        provenance: 'Backend',
        success: true
    });
    await Log.create({
        testId: 1,
        message: '2/3 Test réussi exemple !',
        provenance: 'Backend',
        success: true
    });
    await Log.create({
        testId: 1,
        message: '3/3 Test réussi exemple !',
        provenance: 'Backend',
        success: true
    });

    console.log('✅ Donnée fictive insérée.');
};