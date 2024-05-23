const express = require('express');
const app = express();
const mysql = require('promise-mysql');
//const fileUpload = require('express-fileupload');
const cors = require('cors');
const config = require('./config');

app.use(cors());

// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Middleware pour le traitement des requêtes JSON et URL-encoded
//parse les url
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//app.use(express.static(__dirname+'/public'));

//connexion à la bdd
const host = process.env.HOST || config.db.host;
const database = process.env.DATABASE || config.db.database;
const user = process.env.USER || config.db.user;
const password = process.env.PASSWORD || config.db.password;  

//importation des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
}).then((db) => {
    console.log(`bdd ${database} connectée`)
    setInterval(async () => {
        let res = await db.query('SELECT 1')
    }, 10000)
    app.get('/', async (req, res, next) => {
        res.json({ status: 200, msg: "Hello, bienvenue sur le projet backend-node" })
    })  

    //appel des routes
    authRoutes(app, db);
    userRoutes(app, db);
})
.catch(err =>console.log(err));

const PORT = process.env.PORT || 9501
app.listen(PORT, () => {
    console.log(`Serveur en route sur le port ${PORT}. All is ok !`)
})  
