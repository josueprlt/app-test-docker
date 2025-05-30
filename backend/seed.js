module.exports = async (db) => {
    const { Test } = db;
    const { Option } = db;

    await Test.create({
        name: 'Parcours de Connexion',
        description: 'Vérifie le parcours utilisateur permettant de se connecter à l\'application MonEureden V2',
        type: '2-accueilPage'
    });
    await Test.create({
        name: 'Parcours Signature Précurseur Explosif',
        description: 'Vérifie le parcours de signature d\'un précurseur explosif dans l\'application MonEureden V2',
        type: '5-precurseurExplosif'
    });

    await Option.create({
        testId: 2,
        question: 'Le tiers a t-il déjà acheté ?',
        choice: ["oui","non"]
    });
    await Option.create({
        testId: 2,
        question: 'La pièce d\'identité du tiers est-elle valide ou non ?',
        choice: ["valide","expire"]
    });
    await Option.create({
        testId: 2,
        question: 'L\'attestation Précuseur Explosif du tiers est-il valide, expiré ou sur une échéance de 3 mois ?',
        choice: ["actif", "echeance", "expire"]
    });

    console.log('✅ Donnée fictive insérée.');
};