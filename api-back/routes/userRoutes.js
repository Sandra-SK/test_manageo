require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.TOKEN_SECRET;
const auth = require('../auth')

module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db)
    
    // Regex pour vérifier les caractères spéciaux potentiellement utilisés dans les injections SQL
    const sqlInjectionRegex = /[;'"\\]/;
    // Middleware pour verifier les injections SQL
    const checkSqlInjection = (req, res, next) => {
        if (sqlInjectionRegex.test(req.body.email) || sqlInjectionRegex.test(req.body.password) || sqlInjectionRegex.test(req.body.firstName) || sqlInjectionRegex.test(req.body.lastName) || sqlInjectionRegex.test(req.body.bio)){
            return res.json({ status: 400, msg: "Caractères spéciaux non autorisés." });
    }
    next();
    };

    //route d'enregistrement d'un utilisateur
    app.post('/api/v1/user/save',checkSqlInjection, async (req, res, next) => {
        // Vérification validité de l'adresse e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.json({ status: 400, msg: "Adresse e-mail invalide." });
        }

        //vérification si mail existant
        let checkMail = await userModel.getUserByEmail(req.body.email)
        if(checkMail.code){
            return res.json({status: 500, msg: "Erreur email.",err: checkMail})
        }

        //le mail existe déjà :alerte
        if(checkMail.length > 0){
            if(checkMail[0].email === req.body.email){
               return res.json({status: 401, msg: "email déjà utilisé, saisir un autre email"})
            }
        }
        
        // Vérification si nom et prénom existants
        let checkName = await userModel.getUserByName(req.body.firstName, req.body.lastName);
        if (checkName.code) {
            return res.json({ status: 500, msg: "Erreur lors de la vérification du nom et prénom.", err: checkName });
        }

        // Le nom et prénom existent déjà : alerte
        if (checkName.length > 0) {
            return res.json({ status: 401, msg: "Nom et prénom déjà utilisés, saisir un autre nom et prénom." });
        }
        
        else {
   
            //ajout d'un regex pour contrôler la qualité minimum du mot de passe choisi
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*-_])(?=.{8,})/
            if (!passwordRegex.test(req.body.password)){
                return res.json({status:400, msg:"Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre, un caractère spécial (!@#$%^&*-_) et comporter 8 caractères minimum."})
            }
            //si mail inexistant et regex ok: enregistrement de l'utilisateur
            let user = await userModel.saveOneUser(req)
            if(user.code){
               return res.json({status: 500, msg: "erreur lors de l'enregistrement de l'utilisateur", err: user})
            }
            return res.json({status: 200, msg: "L'utilisateur a bien été enregistré!"})
        }
    })
    
    
    //route de connexion d'un utilisateur (création token)
    app.post('/api/v1/user/login',checkSqlInjection, async (req, res, next)=>{
        console.log("on entre sur la route login")
        if(req.body.email === ""){
            return res.json({status: 401, msg: "Entrez un email..."})
        }
        //recherche de l' utilisateur dans la bdd avec l'email saisi pour se connecter
        let user = await userModel.getUserByEmail(req.body.email)
        if(user.code){
            return res.json({status: 500, msg: "Erreur lors de la vérification du email.",err: user})
        }
        //si il n'existe pas
        if(user.length === 0){
            return res.json({status: 404, msg: "aucun utilisateur ne correspond au email saisi."})
        } else {
            //on compare les password avec bcrypt
            let same = await bcrypt.compare(req.body.password, user[0].password)
            //si c'est true, les mdp sont identiques
            if(same){
                //dans payload on stocke les valeurs qu'on va glisser dans le token 
                const payload = {email: req.body.email, user_id: user[0].user_id}
                //on crée notre token avec sa signature (secret)
                const token = jwt.sign(payload, secret)
                //on retourne un json avec le token
                return res.json({status: 200, token: token, user_id: user[0].user_id})
            } else {
                //on retourne un json d'erreur
                return res.json({status: 401, error: "Votre mot de passe est incorrect !"})
            }
        }
    })
    
    
    //route de modification des utilisateurs
    app.put('/api/v1/user/update/:user_id', auth, checkSqlInjection, async (req, res, next)=>{
        let userId = req.params.user_id
        let user = await userModel.updateUser(req, userId)       
        if(user.code){
            return res.json({status: 500, msg: "erreur lors de la modification du profil", err: user})
        }
        //mon profil est modifié je renvoie les infos de profil mis à jour vers le front
        let newUser = await userModel.getOneUser(userId)
        if(newUser.code){
            return res.json({status: 500, msg: "erreur lors de l'enregistrement du nouveau profil", err: newUser})
        }
        return res.json({status: 200, result: user, newUser: newUser[0]})
    })

    //route de suppression d'un utilisateur
    app.delete('/api/v1/user/delete/:user_id', auth, async (req, res, next)=>{
        let userId = req.params.user_id
        let user = await userModel.deleteUser(userId)
        if(user.code){
            return res.json({status: 500, msg: "erreur lors de la suppression de l'utilisateur", err: user})
        }
        return res.json({status: 200, result: user})
    })
    
}