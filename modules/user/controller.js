const express = require('express');
const router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../../config/db-connection')

const User = require('./model')
router.use(cors())

process.env.SECRET_KEY = 'secret'

db.sequelize.getQueryInterface().showAllSchemas()
    .then((tableObj) => {
        console.log('// Tables in database', '==========================');
        JSON.stringify(tableObj)
        console.log(tableObj)
    })
    .catch((err) => {
        console.log('showAllSchemas ERROR', err);
    })

router.get('/:username', (req, res) => {
    User.findAll({
        where: {
            username: req.params.username
        }
    })
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            res.send(err)
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
                        res.json({ token: token })
                    })
                    .catch(err => {
                        res.send('error : ' + err)
                    })
            } else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send('error : ' + err)
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
                res.json({ token: token })
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error : ' + err)
        })
})

router.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        where: {
            id: decoded.id
        }
    })
        .then(user => {
            user ? res.json(user) : res.send('User does not exist')
        })
        .catch(err => {
            res.send('error : ' + err)
        })
})

module.exports = router;
