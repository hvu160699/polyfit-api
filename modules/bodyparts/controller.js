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
                res.send({ status: 0, message: "Success!", Response: data })
            } else {
                res.send({ status: 1, message: "None data!" })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

router.post("/create", async (req, res) => {
    const bodypartsData = {
        title: req.body.title,
        image_url: req.body.image_url,
    }

    // const data = await Bodyparts.create(bodypartsData)
    // res.json({ status: 1, data });


    Bodyparts.findOrCreate({
        where: bodypartsData
    })
        .then(([bodypart, created]) => {
            res.json({status: 0, msg: created});
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
                res.send({ status: 0, message: "Update success!" })
                obj.update(bodypartsData)
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

