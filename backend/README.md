# 📡 Backend

## 📑 **Installation du dossier Backend**

1. **Installez les dépendances** :

   ```bash
   cd .\test-mon-eureden-v2\backend\
   npm install
   ```

2. **Configurez le .env dans le backend** :

    Dupliquez le fichier `.env.example` en `.env` à la racine du dossier **backend**, puis renseignez-y les variables d’environnement liées aux informations de connexion, à la **base de donnée** :

    ```.env
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    DB_PORT=
    PORT=
    ```

## 📝 **Structure du dossier**

    .
    ├── README.md           # Ce fichier
    ├── Dockerfile          # fichier contenant les instructions nécessaires de création d'une image
    │
    ├── config            # Dossier comportant la config du serveur backend
    ├── controllers           # Dossier contenant les fonctions appelées lors d'une requête API
    ├── models               # Dossier contenant les models de table et relation
    ├── routes               # Dossier contenant la config des routes d'API
    │
    ├── index.js           # Fichier principal, s'occupe de lancer le server
    └── seed.js            # Fichier permettant d'insérée des données à la bdd

## 🔧 **Technos utilisées _(détaillées)_**

Pour le backend : 
    - Node.js
    - Express (Framework)
    - _axios_
    - _cors_
    - _dotenv_
    - _express_
    - _mysql2_
    - _pg_
    - _sequelize_

---

*Dernière mise à jour faite le 05 juin 2025 à 10:18*