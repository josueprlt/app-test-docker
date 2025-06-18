module.exports = async (db) => {
    const {Test} = db;

    const createIfNotExists = async (model, where, data) => {
        const found = await model.findOne({where});
        if (!found) {
            await model.create(data);
            console.log(`✅ Entrée créée : ${data.name}`);
        } else {
            console.log(`⚠️ Entrée déjà existante : ${data.name}`);
        }
    };

    await createIfNotExists(Test, {name: 'Parcours de Navigation'}, {
        name: 'Parcours de Navigation',
        description: 'Vérifie simplement que la navigation vers l\'url de MEV2 est correcte et fonctionne.',
        type: '1-loginPage',
        success: true
    });

    await createIfNotExists(Test, {name: 'Parcours de Connexion'}, {
        name: 'Parcours de Connexion',
        description: 'Vérifie le parcours utilisateur permettant de se connecter à l\'application MonEureden V2',
        type: '2-accueilPage',
        success: true
    });

    await createIfNotExists(Test, {name: 'Parcours vers les Documents'}, {
        name: 'Parcours vers les Documents',
        description: 'Vérifie le parcours utilisateur permettant de se rendre jusqu\'à la page des documents par rapport à l\'application MonEureden V2',
        type: '3-documentsPage',
        success: true
    });

    await createIfNotExists(Test, {name: 'Parcours vers les Événements'}, {
        name: 'Parcours vers les Événements',
        description: 'Vérifie le parcours utilisateur permettant de se rendre jusqu\'à la page des événements par rapport à l\'application MonEureden V2',
        type: '4-evenementsPage',
        success: true
    });

    const choices1 = ["oui", "non"];
    const choices2 = ["valide", "expire"];
    const choices3 = ["actif", "echeance", "expire"];

    const insertions = [];

    for (const c1 of choices1) {
        for (const c2 of choices2) {
            for (const c3 of choices3) {
                const name = `Parcours Signature PE ${c1}/${c2}/${c3}`;
                insertions.push(
                    createIfNotExists(Test, {name}, {
                        name,
                        description: `Vérifie le parcours de signature d'un précurseur explosif dans l'application MonEureden V2`,
                        type: `5-precurseurExplosif-[${c1}/${c2}/${c3}]`,
                        success: true
                    })
                );
            }
        }
    }

    await Promise.all(insertions);

    await createIfNotExists(Test, {name: 'Parcours de Création de Compte'}, {
        name: 'Parcours de Création de Compte',
        description: 'Vérifie le parcours de création de compte pour accèder à l\'application MonEureden V2',
        type: '6-creationCompte',
        success: true
    });

    await createIfNotExists(Test, {name: 'Parcours Avantage Pro Souscription'}, {
        name: 'Parcours Avantage Pro Souscription',
        description: 'Vérifie le parcours utilisateur permettant de se rendre jusqu\'à la page des avantages, et ensuite de remplir et soumettre le formulaire sur l\'application MonEureden V2',
        type: '7-avantageProSouscription',
        success: true
    });

    console.log('✅ Données vérifiées et insérées si nécessaire.');
};