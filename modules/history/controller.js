const express = require('express');
const History = require('./model')
const User = require('../user/model')
const router = express.Router();

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

router.post('/create', async (req, res) => {
    const historyData = {
        bmi: req.body.bmi
    }

    const user = await User.findByPk(req.body.id_user);

    user.createHistory(historyData)
        .then(data => {
            if (data) {
                res.send({ status: 0, message: "Create success!" })
            } else {
                res.send({ status: 1, message: `Failed!` })
            }
        })
        .catch(err => {
            throw new Error("Failed to delete!")
        })
})

module.exports = router;
