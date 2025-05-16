module.exports = async (db) => {
    const { Test } = db;
    const { Log } = db;

    await Test.create({
        name: 'Test 1',
        description: 'Ceci est une description fictive',
        date: '2025-05-09T10:00:00.000Z',
        success: true
    });

    await Log.create({
        testId: 1,
        message: '1/3 Test réussi exemple !',
        date: '2025-05-09T10:00:00.000Z',
        success: true
    });
    await Log.create({
        testId: 1,
        message: '2/3 Test réussi exemple !',
        date: '2025-05-09T10:00:00.000Z',
        success: true
    });
    await Log.create({
        testId: 1,
        message: '3/3 Test réussi exemple !',
        date: '2025-05-09T10:00:00.000Z',
        success: true
    });

    console.log('✅ Donnée fictive insérée.');
};