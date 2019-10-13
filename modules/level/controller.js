const express = require('express');
const router = express.Router();
const cors = require('cors')

const Level = require('./model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Level.findAll({
        raw: true
    })
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.send({ error: "None data" })
            }
        })
        .catch(err => {
            res.send({ error: err })
        })
})

router.post("/create", (req, res) => {
    const levelData = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description
    }

    Level.findOne({
        where: {
            title: req.body.title
        }
    })
        .then(level => {
            if (!level) {
                res.send({ status: 0 })
                Level.create(levelData)
            } else {
                res.send({ status: 1 })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

router.put('/update', (req, res) => {
    const levelUpdate = {
        id: req.body.id,
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
    }
    Level.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(obj => {
            if (obj) {
                obj.update(levelUpdate)
                res.json("Update successful !")
            } else {
                res.json({ error: `${req.body.title} doesn't exists` })
            }
        }).catch(err => {
            res.json({ error: err })
        })
})

router.delete('/delete/:id', (req, res) => {
    Level.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (data) {
            data.destroy()
            res.json("Destroy successful!")
        } else {
            res.json({ error: `${req.params.id} doesn't exists` })
        }
    }).catch(err => {
        res.json({ error: err })
    })
})

module.exports = router
