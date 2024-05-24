# USE CASE - TEST - MANAGEO



## DESCRIPTION DU PROJET

### technos:
- BACK:  NODE.JS gestion des routes  avec la librairie express
- FRONT:  REACT

### Gestion profil utilisateur:
- enregistrement, modification, et suppression CRUD
- authentification par access-token via fichier 'api-back/auth.js',''api-back/routes/authRoutes.js' et dans le front via 'src/helpers/require-data-auth.jsx' et '' 
- données d'environements gérées avec dotenv

  

## INSTALLATION DU PROJET

1 - récupérer la structure de la base de donnée à la racine du projet

2 - installer les nodes modules:

            ** pour le backend **
            cd test_manageo/api-back
            npm install
            
            ** pour le front end **
            cd test_manageo/test_manageo-front
            npm install


3 - créer un fichier .env à la racine du back et définir les informations suivantes:

            DB_HOST=XXXX
            DB_DATABASE=XXXX
            DB_USER=XXXX
            DB_PASSWORD=XXXX
            TOKEN_SECRET=XXXX
     


4 - créer un fichier .env à la racine du front et reporter le token secret utilisé dans le back:

            REACT_APP_TOKEN_SECRET=XXXX

5 - lancer les serveurs:

            ** pour le backend **
            cd test_manageo/api-back
            npm run dev


            ** pour le front end **
            cd test_manageo/test_manageo-front
            npm start
  
  


## BASE DE DONNEES:

- type de base de données: MySQL
- Structure:

            users
            'name'
            'email'
            'password'
            'bio'


