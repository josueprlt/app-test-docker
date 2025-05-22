require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
// const seedDatabase = require('./seed');

const testRoutes = require('./routes/test.routes');
const logRoutes = require('./routes/log.routes');
const launchRoutes = require('./routes/launch.routes');
const db = require('./models'); // Import Sequelize + modèles

app.use(cors());
app.use(express.json());
app.use('/api/tests', testRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/launch', launchRoutes);

// Synchronise les modèles puis lance le serveur
db.sequelize.sync({ alter: true }) // utilise { force: true } pour forcer un reset
  .then(async () => {
    console.log('✅ Modèles synchronisés avec la base de données');

    // await seedDatabase(db);

    app.listen(port, '0.0.0.0', () => {
      console.log(`✅ Backend running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur de synchronisation DB :', err);
  });