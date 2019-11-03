const express = require('express');
const router = express.Router();
const cors = require('cors')

const Level = require('./model')
const Exercises = require('../exercises/model')
const Diets = require('../diets/model')
const Meals = require('../meals/model')
const Dishes = require('../dishes/model')

router.use(cors())

router.get("/getAll", (req, res) => {
    Level.findAll({
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

router.get("/getLevelByBMI/:bmi", async (req, res) => {
    const bmi = req.params.bmi
    Level.findOne({
        where: {
            title: bmi < 18.5 ? "Tăng cân" : (bmi >= 18.5 && bmi < 24.9 ? "Giữ dáng" : "Giảm cân")
        },
        include: [
            { model: Exercises, as: "Exercises" }
        ]
    })
        .then(data => {
            if (data) {
                res.send({ status: 0, message: "Success!", Response: data })
            } else {
                res.send({ status: 1, message: `BMI : ${bmi} doesn't exist!` })
            }
        })
        .catch(err => {
            throw new Error(err)
        })

})

router.get('/getAllDishesByIdLevel/:id', (req, res) => {
    Level.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Diets, as: 'Diets', include: [
                    {
                        model: Meals, as: 'Meals', include: [
                            { model: Dishes, as: 'Dishes' }
                        ]
                    }
                ]
            }
        ]
    })
        .then(data => {
            if (data) {
                res.send({ status: 0, message: "Success!", Response: data })
            } else {
                res.send({ status: 1, message: `ID Level : ${req.params.id} doesn't exist!` })
            }
        })
        .catch(err => {
            throw new Error('Failed!')
        })
})

router.get('/getAllExercisesByIdLevel/:id', (req, res) => {
    Level.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { model: Exercises, as: 'Exercises' }
        ]
    })
        .then(data => {
            if (data) {
                res.send({ status: 0, message: "Success!", Response: data })
            } else {
                res.send({ status: 1, message: `ID Level : ${req.params.id} doesn't exist!` })
            }
        })
        .catch(err => {
            throw new Error('Failed!')
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
        .then(obj => {
            if (!obj) {
                res.send({ status: 0, message: "Create success!" })
                Level.create(levelData)
            } else {
                res.send({ status: 1, message: `${req.body.title} is already exists!` })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

router.put('/update', (req, res) => {
    Level.findOne({
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
    Level.findOne({
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
