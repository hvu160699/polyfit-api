const express = require('express');
const router = express.Router();
const cors = require('cors')

const Bodyparts = require('./model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Bodyparts.findAll({
        raw: true
    })
        .then(data => {
            if (data) {
                res.json(data)
            } else {
                res.json({ error: "None data" })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

router.post("/create", (req, res) => {
    const bodypartsData = {
        title: req.body.title,
        image_url: req.body.image_url,
    }

    Bodyparts.findOne({
        where: {
            title: req.body.title
        }
    })
        .then(obj => {
            if (!obj) {
                Bodyparts.create(bodypartsData)
                    .then(result => {
                        res.json(result)
                    })
                    .catch(err => {
                        res.json({ error: err })
                    })
            } else {
                res.json(`${req.body.title} is already exists!`)
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

router.put('/update', (req, res) => {
    const bodypartsData = {
        title: req.body.title,
        image_url: req.body.image_url,
    }

    Bodyparts.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(obj => {
            if (obj) {
                obj.update(bodypartsData)
                res.json("Update successful !")
            } else {
                res.json(`${req.body.id} doesn't exists`)
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

router.delete('/delete/:id', (req, res) => {
    Exercises.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(obj => {
            if (obj) {
                obj.destroy()
                res.json("Destroy successful!")
            }
            else {
                res.json({ error: `Object ID : ${req.params.id} doesn't exists` })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

module.exports = router

