const express = require('express');
const router = express.Router();
const cors = require('cors')

const Meals = require('./model')
const Diets = require('../diets/model')
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
        image_url: req.body.image_url
    }

    Meals.findOne({
        where: {
            title: req.body.title,
        }
    })
        .then(async obj => {
            if (!obj) {
                const diets = await Diets.findByPk(req.body.id_diets)
                diets.createMeal(mealsData).then(result => {
                    res.send({ status: 0, message: `Create success!` })
                }).catch(err => {
                    console.log(err);
                })
            } else {
                res.send({ status: 1, message: `${obj.title} is already exists!` })
            }
        })
        .catch(err => {
            throw new Error(err)
        })
})

router.put('/update', (req, res) => {
    Meals.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(obj => {
            if (obj) {
                obj.update(req.body).then(() => res.send({ status: 0, message: "Update success!" }))
            } else {
                res.send({ status: 1, message: `${obj.id} doesn't exists` })
            }
        })
        .catch(err => {
            throw new Error("Failed to update!")
        })
})

router.delete('/delete/:id', (req, res) => {
    Meals.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data) {
                data.destroy().then(() => res.send({ status: 0, message: "Delete success!" }))
            } else {
                res.send({ status: 1, message: `${req.params.id} doesn't exists` })
            }
        })
        .catch(err => {
            throw new Error("Failed to delete!")
        })
})

module.exports = router





