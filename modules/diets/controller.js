const express = require('express');
const router = express.Router();
const cors = require('cors')

const Diets = require('./model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Diets.findAll({
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

router.post("/create", (req, res) => {
    const dietsData = {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        id_level: req.body.id_level
    }

    Diets.findOne({
        where: {
            title: req.body.title
        }
    })
        .then(obj => {
            if (!obj) {
                res.send({ status: 0, message: "Create success!" })
                Diets.create(dietsData)
            } else {
                res.send({ status: 1, message: `${req.body.title} is already exists!` })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

router.put('/update', (req, res) => {
    const dietsUpdate = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        id_level: req.body.id_level
    }
    Diets.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(obj => {
            if (obj) {
                res.send({ status: 0, message: "Update success!" })
                obj.update(dietsUpdate)
            } else {
                res.send({ status: 1, message: `${req.body.id} doesn't exists` })
            }
        }).catch(err => {
            res.json({ error: err })
        })
})

router.delete('/delete/:id', (req, res) => {
    Diets.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (data) {
            res.send({ status: 0, message: "Delete success!" })
            data.destroy()
        } else {
            res.send({ status: 1, message: `${req.params.id} doesn't exists` })
        }
    }).catch(err => {
        res.json({ error: err })
    })
})

module.exports = router





