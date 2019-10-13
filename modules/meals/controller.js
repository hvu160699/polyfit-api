const express = require('express');
const router = express.Router();
const cors = require('cors')

const Meals = require('./model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Meals.findAll({
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
    const mealsData = {
        title: req.body.title,
        id_diets: req.body.id_diets
    }

    Meals.findOne({
        where: {
            title: req.body.title
        }
    })
        .then(obj => {
            if (!obj) {
                res.send({ status: 0, message: "Create success!" })
                Meals.create(mealsData)
            } else {
                res.send({ status: 1, message: `${req.body.title} is already exists!` })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

router.put('/update', (req, res) => {
    const mealsUpdate = {
        id: req.body.id,
        title: req.body.title,
        id_diets: req.body.id_diets
    }
    Meals.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(obj => {
            if (obj) {
                res.send({ status: 0, message: "Update success!" })
                obj.update(mealsUpdate)
            } else {
                res.send({ status: 1, message: `${req.body.id} doesn't exists` })
            }
        }).catch(err => {
            res.json({ error: err })
        })
})

router.delete('/delete/:id', (req, res) => {
    Meals.findOne({
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





