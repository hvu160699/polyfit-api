const express = require('express');
const router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('./model')
const History = require('../history/model')
const Routine = require('../routine/model')

router.use(cors())

process.env.SECRET_KEY = 'secret'

router.get("/getAllUsers", (req, res) => {
    User.findAll({
        raw: true
    })
        .then(data => {
            if (data) {
                res.send({ status: 0, message: "Success!", Response: data })
            } else {
                res.send({ status: 1, message: "None data!" })
            }
        })
        .catch(err => {
            res.send({ error: err })
        })
})

router.get("/getUserByUsername/:username", (req, res) => {
    User.findOne({
        where: {
            username: req.params.username
        }
    })
        .then(obj => {
            if (obj) {
                res.send({ status: 0, message: "Success!", Object: obj })
            }
            else {
                res.send({ status: 1, message: `${req.params.username} is not exist!` })
            }
        }).catch(err => {
            throw new Error(err)
        })

})

router.get("/getCurrentUser/:id", (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(obj => {
            console.log(obj)
            if (obj) {
                res.send({ status: 0, message: "Success!", Object: obj })
            }
            else {
                res.send({ status: 1, message: `${req.params.id} is not exist!` })
            }
        }).catch(err => {
            throw new Error(err)
        })
})

router.get("/getOnlineUser", (req, res) => {
    User.findAll({
        where: {
            isOnline: true
        }
    })
        .then(data => {
            if (data) res.send({ status: 0, message: "Success!", Response: data })
            else res.send({ status: 0, message: "None data!" })
        })
        .catch(err => {
            throw new Error(err)
        })
})

router.post('/register', (req, res) => {
    let bmi = (req.body.weight / (req.body.height * 2)) * 100
    const userData = {
        display_name: req.body.display_name,
        username: req.body.username,
        password: req.body.password,
        weight: req.body.weight,
        height: req.body.height,
        bmi: bmi.toFixed(2),
        gender: req.body.gender,
    }

    console.log(req.body);

    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                const hash = bcrypt.hashSync(userData.password, 10)
                userData.password = hash

                User.create(userData)
                    .then(user => {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        })
                        res.send({ status: 0, message: "Success!", Response: token })
                    })
                    .catch(err => {
                        res.send({ status: 1, message: "Failure!" })
                    })
            } else {
                res.json({ status: 2, message: "User already exists!" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })

                user.update({ isOnline: true, firebase_token: req.body.firebase_token }).then(() => {
                    res.send({ status: 0, message: "Login success!", Object: user })
                })
            } else {
                res.send({ status: 1, message: "Wrong password!" })
            }
        })
        .catch(err => {
            throw new Error("User doesn't exist!")
        })
})

router.post('/logout', (req, res) => {
    User.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(user => {
            if (user) {
                user.update({ isOnline: false, firebase_token: null })
                    .then(() => res.send({ status: 0, message: "Logout!" }))
                    .catch(err => { throw new Error(err) })
            } else {
                res.send({ status: 1, message: `Failed!` })
            }
        })
})

router.post('/update', (req, res) => {
    let bmi = (req.body.weight / (req.body.height * 2)) * 100

    User.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(obj => {
            if (obj) {
                obj.update({ ...req.body, bmi: bmi.toFixed(2) }).then(() => res.send({ status: 0, message: "Update success!" }))
            } else {
                res.send({ status: 1, message: `${obj.id} doesn't exists` })
            }
        })
        .catch(err => {
            throw new Error("Failed to update!")
        })
})

module.exports = router;
