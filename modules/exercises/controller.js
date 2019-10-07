const express = require('express');
const router = express.Router();
const cors = require('cors')

const Exercises = require('./model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Exercises.findAll({
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
    const exercisesData = {
        title: req.body.title,
        introduction: req.body.introduction,
        content: req.body.content,
        tips: req.body.tips,
        sets: req.body.sets,
        reps: req.body.reps,
        rest: req.body.rest,
        video_url: req.body.video_url,
        image_url: req.body.image_url,
        id_level: req.body.id_level
    }

    // Exercises.belongTo()

    Exercises.findOne({
        where: {
            title: req.body.title
        }
    })
        .then(obj => {
            if (!obj) {
                Exercises.create(exercisesData)
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
    const exercisesUpdate = {
        title: req.body.title,
        introduction: req.body.introduction,
        content: req.body.content,
        tips: req.body.tips,
        sets: req.body.sets,
        reps: req.body.reps,
        rest: req.body.rest,
        video_url: req.body.video_url,
        image_url: req.body.image_url,
        id_level: req.body.id_level
    }
    Exercises.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(obj => {
            if (obj) {
                obj.update(exercisesUpdate)
                res.json("Update successful !")
            } else {
                res.json(`${req.params.title} doesn't exists`)
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

