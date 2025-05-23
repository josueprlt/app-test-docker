const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
  }
);

// Vérifie la connexion
sequelize.authenticate()
  .then(() => console.log('✅ Connexion DB réussie'))
  .catch(err => console.error('❌ Erreur connexion DB :', err));

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Modèles
db.Test = require('./test.model')(sequelize, Sequelize);
db.Log = require('./log.model')(sequelize, Sequelize);
db.Option = require('./option.model')(sequelize, Sequelize);

// Relations
db.Test.hasMany(db.Log, { foreignKey: 'testId', as: 'logs', onDelete: 'CASCADE' });
db.Test.hasMany(db.Option, { foreignKey: 'testId', as: 'options', onDelete: 'CASCADE' });
db.Log.belongsTo(db.Test, { foreignKey: 'testId' });

module.exports = db;