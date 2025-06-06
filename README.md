# 🚀 **Test avec Selenium et Node.js - Selfcare**


## 📦 **Prérequis**

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (version 14 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)
- **Selenium WebDriver** : Utilisé pour l'automatisation du navigateur : [Documentation Selenium Webdriver](https://www.selenium.dev/documentation/webdriver/)


## 📑 **Installation Complète**

1. **Clonez le dépôt du projet** :

   ```bash
   git clone https://gitlab.cicd.ddfbackend.com/ddf/backend/test-mon-eureden-v2.git
   ```

2. **Déplacez-vous vers la branche à jour** :

   ```bash
   git checkout dev_2.0.0
   ```

3. **Suite de l'installation pour chaque dossier** :

    Rendez-vous sur le `README.md` présent dans chaque dossier via les liens ci-dessous.

    _Pour le dossier **backend** :_  
    [Accéder au README](./backend/README.md)

    _Pour le dossier **frontend** :_  
    [Accéder au README](./frontend/README.md)
   
    _Pour le dossier **selenium** :_  
    [Accéder au README](./selenium/README.md)

4. **Configurez les informations de connexion dans le .env** :

    Dupliquez le fichier `.env.example` en `.env` à la racine du projet, puis renseignez-y les variables d’environnement liées aux informations de connexion, à la **base de donnée** et à **pgadmin** :

    ```.env
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=

    PGADMIN_DEFAULT_EMAIL=
    PGADMIN_DEFAULT_PASSWORD=

    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    ```

7. **Lancez le projet docker** :

    Assurez-vous que **Docker** est bien démarré sur votre machine, puis exécutez la commande suivante à la racine du projet :
   ```bash
   docker-compose up --build
   ```

8. **Accèdez au tableau de bord des rapport de tests** :

    Lorsque tous les **conteneurs Docker** sont correctement lancés et que vous voyez ces messages dans la console :

    - `✅ Modèles synchronisés avec la base de données`
    - `✅ Backend running on port 5001`

    Cela signifie que le backend est opérationnel et que vous pouvez commencer à naviguer sur les différentes interfaces du projet :

    - Lien vers le tableau de bord : [localhost:5173](http://localhost:5173/)
    - Lien vers Selenium Grid pour observer les tests : [localhost:4444](http://localhost:4444/)
    - Lien vers PgAdmin pour la bdd : [localhost:8080](http://localhost:8080/)


## 🌿 **Gestion du Dépôt GitLab**
Le projet utilise **GitLab** pour le versionnement du code. Voici la structure des branches :

### 📌 **Branches principales**
    
    🌳 main                      # Branche principale
    ├── dev_1.0.0                # Ancienne version du projet
    ├── dev_2.0.0                # Projet à jour


### 🏷️ **Branches Actuelles**
- `main` : Branche principale.
- `dev_1.0.0` : Branche contenant une ancienne version du projet.
- `dev_2.0.0` : Branche avec le projet à jour.


## 📝 **Structure du Projet**

    .
    ├── README.md               # Ce fichier
    ├── docker-compose.yml      # fichier de config du projet docker
    ├── .env.example            # fichier à configurer pour le bon fonctionnement du projet
    │
    ├── backend                 # Container backend
    ├── frontend                # Container frontend
    └── selenium                # Container des tests selenium


## 🔧 **Technos utilisées**

1. Pour le backend : 
    - Node.js
    - Express (Framework)

2. Pour le frontend : 
    - React.js
    - TailwindCSS (Framework)

3. Pour selenium : 
    - Node.js
    - Selenium (Librairie)


## ❌ **Erreurs et Dépannage**

Si vous essayez de vous connecter à **MEV2** en recette, et que vous obtener une page blanche avec cette erreur :
``` {"code":401,"message":"Unauthorized"} ```

C'est que **l'URL** de connexion dans le fichier `connexion.json` a expiré. Vous devez tous simplement la changé par une nouvelle **URL à jour**.

Pour éviter ce problème, assurez-vous que l'URL ressemble à l'exemple suivant :
`https://s3-eu-west-1.amazonaws.com/statics.eureden.fr/webapps/d41fe64f-3b25-4ac3-a704-d30cbe7fc153/index.html`

---

*Dernière mise à jour faite le 05 juin 2025 à 10:19*