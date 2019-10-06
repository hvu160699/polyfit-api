const express = require('express');
const router = express.Router();
const cors = require('cors')

const Level = require('./model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Level.findAll()
        .then(data => {
            if (data) {
                res.json(data)
            } else {
                res.json({ error: "None data" })
            }
        })
        .catch(err => {
            res.json("Error: " + err)
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
                Level.create(levelData)
                    .then(data => {
                        res.json(data)
                        console.log("Level created success!")
                    })
                    .catch(err => {
                        res.json('error: ' + err)
                    })
            } else {
                res.json({ error: "Level already exists" })
            }
        })
        .catch(err => {
            res.json('error: ' + err)
        })
})

router.put('/update/:title', (req, res) => {
    const levelUpdate = {
        image: req.body.image,
        description: req.body.description,
    }
    Level.findOne({
        where: {
            title: req.params.title
        }
    })
        .then(obj => {
            if (obj) {
                obj.update(levelUpdate)
                res.json("Update successful !")
            } else {
                res.json({ error: `${req.params.title} doesn't exists` })
            }
        }).catch(err => {
            res.json("Error: " + err)
        })
})

router.delete('/delete/:title', (req, res) => {
    Level.findOne({
        where: {
            title: req.params.title
        }
    }).then(data => {
        if (data) {
            data.destroy()
            res.json("Destroy successful!")
        } else {
            res.json({ error: `${req.params.title} doesn't exists` })
        }
    }).catch(err => {
        res.json("Error: " + err)
    })
})

module.exports = router
