const express = require('express');
const router = express.Router();
const cors = require('cors')

const Exercises = require('../exercises/model')
const Bodyparts = require('./model')
router.use(cors())

router.get('/getAll', (req, res) => {
    Bodyparts.findAll({ include: [
        { model: Exercises, as: 'exercises' }
    ]})
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

router.get('/getDetailBodyparts/:id', (req, res) => {
    Bodyparts.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { model: Exercises, as: 'exercises' }
        ]
    })
        .then(obj => {
            if (obj) {
                res.send({ status: 0, message: 'Success!', Object: obj })
            } else {
                res.send({ status: 1, message: `ID Bodyparts: ${req.params.id} doesn't exists!` })
            }
        })
        .catch(err => {
            throw new Error(err)
        })
})

router.post('/create', async (req, res) => {
    const bodypartsData = {
        title: req.body.title,
        image_url: req.body.image_url,
    }

    Bodyparts.findOrCreate({
        where: bodypartsData
    })
        .then(([bodypart, created]) => {
            if (created) {
                res.send({ status: 0, message: `Create success!` });
            } else {
                res.send({ status: 1, message: `${bodypart.title} is already exists!` })
            }
        })
})

router.put('/update', (req, res) => {
    Bodyparts.findOne({
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
    Bodyparts.findOne({
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

