const express = require('express');
const router = express.Router();
const cors = require('cors')

const Exercises = require('./model')
const Bodyparts = require('../bodyparts/model');
const Level = require("../level/model");
router.use(cors())

router.get("/getAll", (req, res) => {
    Exercises.findAll({
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
    }
    
    const idBodypart = req.body.id_bodypart;

    Exercises.findOne({
        where: {
            title: req.body.title
        }
    })
        .then(async obj => {
            if (!obj) {
                const bodypart = await Bodyparts.findByPk(idBodypart);
                const level = await Level.findByPk(req.body.id_level); // Find Level By Primary key

                //Hàm addExercise là hàm được tạo ra bởi Sequilize khi khai báo quan hệ
                //https://stackoverflow.com/questions/36265795/sequelize-list-of-functions-on-the-object
                const createdEx = await level.addExercise(exercisesData); 
                return createdEx.addBodypart(bodypart).then(result => {
                    return res.send({ status: 0, message: `success` })
                })

            
            
            } else {
                res.send({ status: 1, message: `${req.body.title} is already exists!` })
            }
        })
        .catch(err => {
            console.log(err)
            res.json({ error: err })
        })
})

router.get('/exDetail/:id', async (req, res) => {
    //Lấy ra bài tập và các thông tin liên quan như level + bodypart
    const ex = await Exercises.findOne({ where: { id: req.params.id }, include: [{
        model: Level
    }, { model: Bodyparts, as: 'bodyparts' }]});

    res.send({ status: 0, message: 'Thành công ( Phú )', data: ex});
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
                res.send({ status: 0, message: "Update success!" })
                obj.update(exercisesUpdate)
            } else {
                res.send({ status: 1, message: `${req.body.id} doesn't exists` })
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
        .then(data => {
            if (data) {
                res.send({ status: 0, message: "Delete success!" })
                data.destroy()
            } else {
                res.send({ status: 1, message: `${req.params.id} doesn't exists` })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

module.exports = router

