const con = require('../../config/db-connection')
const utils = require('./utils')
const express = require('express');
const router = express.Router();
const path = '/'

router.get(path, (req, res) => {
    con.query("SELECT * FROM `polyfit_users`", function (err, result, fields) {
        if (err) return err;
        res.send(result);
    });
})

router.post("/register", (req, res) => {
    const display_name = req.body.display_name;
    const username = req.body.username
    const plaint_password = req.body.password;
    const hash_data = utils.saltHashPassword(plaint_password);
    const password = hash_data.passwordHash;
    const salt = hash_data.salt;
    const weight=req.body.weight;
    const height=req.body.height;
    const bmi=req.body.bmi;
    const gender=req.body.gender;

    con.query("SELECT * FROM `polyfit_users` WHERE username=?", [username], (err, result, fields) => {
        con.on('error', (err) => {
            console.log("MySQL ERROR : ", err);
        })
        if (result && result.length) {
            res.json('Username already exists !!!');
        } else {
            const registerSQL = "INSERT INTO `polyfit_users` (`display_name`, `username`, `password`, `password_salt`, `weight`, `height`, `bmi`, `gender`, `create_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())"
            con.query(registerSQL, [display_name, username, password, salt, weight, height, bmi, gender], () => {
                con.on('error', err => {
                    console.log("MySQL ERROR : ", err);
                    res.json("Register error : ", err);
                })
                res.json("Register Success!");
            })
        }
    })
})

router.get("/getByUserName/:username", (req, res) => {
    const username=req.params.username;
    con.query("SELECT * FROM `polyfit_users` WHERE `username`=?",username, function (err, result, fields) {
        if (err) return err;
        res.send(result);
    });
})

router.post("/login", (req, res) => {
    const login_username = req.body.username;
    const login_password = req.body.password;
    con.query("SELECT * FROM `polyfit_users` WHERE username=?", [login_username], (err, result, fields) => {
        con.on('error', (err) => {
            console.log("MySQL ERROR : ", err);
            res.json("Login error : ", err)
        });
        if (result && result.length) {
            const salt = result[0].password_salt;
            const password = result[0].password;
            const hashed_password = utils.checkHashPassword(login_password, salt).passwordHash;
            if (password == hashed_password) {
                res.end("Login success !")
                res.end(JSON.stringify(result[0]))
            }
            else {
                res.end("Wrong password !");
            }
        } else {
            res.end("User doesn't exists");
        }
    });
})

router.put(path, (req, res) => {
    res.send("PUT user")
})

router.delete(path, (req, res) => {
    res.send("DELETE user")
})

module.exports = router;
