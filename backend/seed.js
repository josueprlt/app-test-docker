module.exports = async (db) => {
    const { Test } = db;
    const { Option } = db;

    // Supprime toutes les données existantes dans la table Test et Option
    await Test.destroy({ where: {} });
    await Option.destroy({ where: {} });

    await Test.create({
        name: 'Parcours de Connexion',
        description: 'Vérifie le parcours utilisateur permettant de se connecter à l\'application MonEureden V2',
        type: '2-accueilPage',
        success: null
    });

    const choices1 = ["oui", "non"];
    const choices2 = ["valide", "expire"];
    const choices3 = ["actif", "echeance", "expire"];
    
    for (const c1 of choices1) {
        for (const c2 of choices2) {
            for (const c3 of choices3) {
                await Test.create({
                    name: `Parcours Signature PE ${c1}/${c2}/${c3}`,
                    description: `Vérifie le parcours de signature d'un précurseur explosif dans l'application MonEureden V2`,
                    type: `5-precurseurExplosif-[${c1}/${c2}/${c3}]`,
                    success: null
                });
            }
        }
    }

    await Test.create({
        name: 'Parcours de Création de Compte',
        description: 'Vérifie le parcours de création de compte pour accèder à l\'application MonEureden V2',
        type: '6-creationCompte',
        success: null
    });
    
    // await Option.create({
    //     testId: 2,
    //     question: 'Le tiers a t-il déjà acheté ?',
    //     choice: ["oui","non"]
    // });
    // await Option.create({
    //     testId: 2,
    //     question: 'La pièce d\'identité du tiers est-elle valide ou non ?',
    //     choice: ["valide","expire"]
    // });
    // await Option.create({
    //     testId: 2,
    //     question: 'L\'attestation Précuseur Explosif du tiers est-il valide, expiré ou sur une échéance de 3 mois ?',
    //     choice: ["actif", "echeance", "expire"]
    // });

    console.log('✅ Donnée insérée.');
};