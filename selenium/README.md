# 📡 Selenium

## 📑 **Installation du dossier Selenium**

1. **Installez les dépendances** :

   ```bash
   cd ..\selenium\
   npm install
   ```

2. **Configurez le .env dans le dossier selenium** :

    Dupliquez le fichier `.env.example` en `.env` à la racine du dossier **selenium**, puis renseignez-y les variables d’environnement liées aux urls de test et aux informations de connexion aux **site de tests** :

    ```.env
    TOKEN_URL=
    TOKEN_GRANT_TYPE=
    TOKEN_CLIENT_ID=
    TOKEN_CLIENT_SECRET=

    MEV2_URL=
    MEV2_MAIL=
    MEV2_PASSWORD=
    MEV2_CODETIERS=
    MEV2_CODECONTACT=
    MEV2_SELLER_MAIL=
    MEV2_SELLER_PASSWORD=
    MEV2_SELLER_CODETIERS=
    MEV2_SELLER_CODECONTACT=

    MOSAIK_URL=
    MOSAIK_LOGIN=
    MOSAIK_PASSWORD=
    ```

## 📝 **Structure du dossier**

    .
    ├── README.md               # Ce fichier
    ├── Dockerfile              # fichier contenant les instructions nécessaires de création d'une image
    ├── .env.example            # fichier à configurer pour le bon fonctionnement du projet
    │
    └── MonEuredenV2            # Dossier de tests pour MEV2
        ├── processes            # Dossier contenant les processes back/front
        ├── steps            # Dossier contenant les étapes redondantes back/front
        ├── templates            # Dossier contenant les templates à réutilisées
        ├── tests            # Dossier contenant les fichiers de tests à éxécuter
        └── utils            # Dossier contenant les utilitaires

## 🔧 **Technos utilisées _(détaillées)_**

Pour selenium : 
    - Node.js
    - Selenium (Librairie)
    - _axios_
    - _chalk_
    - _cors_
    - _dotenv_
    - _express_
    - _selenium-webdriver_
    - _uuid_

---

*Dernière mise à jour faite le 05 juin 2025 à 09:30*