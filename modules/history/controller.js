const con = require('../../config/db-connection')
const express = require('express');
const History = require('./model')
const router = express.Router();
const path = '/'

router.get(path, (req, res) => {
    con.query("SELECT * FROM `polyfit_history`", function (err, result, fields) {
        if (err) return err;
        res.send(result);
    });
})

router.get('/getHistoryByUserId/:id', (req, res) => {
    History.findAll({
        where: {
            polyfitUserId: req.params.id
        }
    })
        .then(data => {
            if (data) res.send({ status: 0, message: "Success!", Response: data })
            else res.send({ status: 0, message: `ID User : ${req.params.id} doesn't exist!` })
        })
        .catch(err => {
            throw new Error(err)
        })
})

router.post("/add", (req, res) => {
    const bmi = req.body.bmi;
    const id_level = req.body.id_level;
    const id_user = req.body.id_user;
    const addHistory = "INSERT INTO `polyfit_history` (`bmi`, `id_level`, `id_user`) VALUES (?, ?, ?)"
    con.query(addHistory, [bmi, id_level, id_user], () => {
        con.on('error', err => {
            console.log("MySQL ERROR : ", err);
            res.json("Add error : ", err);
        })
        res.json("Add Success!");
    })
})


router.put(path, (req, res) => {
    res.send("PUT history")
})

router.delete(path, (req, res) => {
    res.send("DELETE history")
})

module.exports = router;
