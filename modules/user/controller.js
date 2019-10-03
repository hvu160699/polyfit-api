const express = require('express');
const router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('./model')
router.use(cors())

process.env.SECRET_KEY = 'secret'

router.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        display_name: req.body.display_name,
        username: req.body.username,
        password: req.body.password,
        weight: req.body.weight,
        height: req.body.height,
        bmi: req.body.bmi,
        gender: req.body.gender,
        create_at: today
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
