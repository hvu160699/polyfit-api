const express = require('express');
const router = express.Router();
const cors = require('cors')

const Diets = require('./model')
const Dishes = require('../dishes/model')
const Meals = require('../meals/model')
const Level = require('../level/model')
router.use(cors())

router.get('/getAll', (req, res) => {
    Diets.findAll()
        .then(data => {
            if (data) {
                res.send({ status: 0, message: 'Success!', Response: data })
            } else {
                res.send({ status: 1, message: 'None data!' })
            }
        })
        .catch(err => {
            throw new Error(err)
        })
})

router.get('/getAllDishesByDiets/:id', (req, res) => {
    Diets.findAll({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Meals, as: 'Meals',
                include: [
                    { model: Dishes, as: 'Dishes' }
                ]
            }
        ]
    })
        .then(data => {
            if (data) {
                res.send({ status: 0, message: 'Success!', Response: data })
            } else {
                res.send({ status: 1, message: `ID Diets : ${req.params.id} doesn't exist!` })
            }
        })
        .catch(err => {
            throw new Error(err)
        })
})

router.post('/create', (req, res) => {
    const dietsData = {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
    }

    Diets.findOne({
        where: {
            title: req.body.title
        }
    })
        .then(async obj => {
            if (!obj) {
                const level = await Level.findByPk(req.body.id_level);

                level.createPolyfit_diet(dietsData).then(result => {
                    res.send({ status: 0, message: `Create success!` })
                }).catch(err => {
                    console.log(err);
                })
            } else {
                res.send({ status: 1, message: `${req.body.title} is already exists!` })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})


router.put('/update', (req, res) => {
    Diets.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(obj => {
            if (obj) {
                obj.update(req.body).then(() => res.send({ status: 0, message: 'Update success!' }))
            } else {
                res.send({ status: 1, message: `${obj.id} doesn't exists` })
            }
        })
        .catch(err => {
            throw new Error('Failed to update!')
        })
})

router.delete('/delete/:id', (req, res) => {
    Diets.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data) {
                data.destroy().then(() => res.send({ status: 0, message: 'Delete success!' }))
            } else {
                res.send({ status: 1, message: `${req.params.id} doesn't exists` })
            }
        })
        .catch(err => {
            throw new Error('Failed to delete!')
        })
})

module.exports = router





