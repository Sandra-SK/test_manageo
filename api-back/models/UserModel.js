const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (_db)=>{
    db=_db
    return UserModel
}

class UserModel {
    //sauvegarde d'un membre
    static saveOneUser(req){
        let sql = "INSERT INTO users (name, email, password, bio) VALUES (?,?,?,NULL)"
        return bcrypt.hash(req.body.password,saltRounds)
        
        .then((hash)=>{
            return db.query(sql,[req.body.name, req.body.email, hash, req.body.bio])
            .then((res)=>{
                return res
            })
            .catch((err)=>{
                return err
            })
        })
        .catch((err)=>{
            return err
        })
    }
    
    //récupération d'un utilisateur en fonction de son email
    static getUserByEmail(email){
            let sql = "SELECT * FROM users WHERE email = ?"
            
            return db.query(sql, [email])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
        
    }

    //récupération d'un utilisateur en fonction de son nom et prénom
    static getUserByName(name){
        let sql = "SELECT * FROM users WHERE name = ?"
        return db.query(sql, [name])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
        
    }
    
    //récupération d'un utilisateur par son id
    static getOneUser(user_id){
        let sql = "SELECT * FROM users WHERE user_id = ?"
        return db.query(sql, [user_id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
        
    }
    
    //modification d'un profil utilisateur
    static updateUser(req, user_id){
        return db.query("UPDATE users SET name = ?, email = ?, bio = ? WHERE user_id = ?", [req.body.name, req.body.email, req.body.bio, user_id])
        .then((res)=>{
                return res
            })
        .catch((err)=>{
            return err
        })
    }

    //suppression d'un utilisateur
    static deleteUser(user_id){
        let sql = "DELETE FROM users WHERE user_id = ?"
        return db.query(sql, [user_id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    
}