const express = require('express');
const router = express.Router();
const cors = require('cors')

const Ingredients = require('./model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Ingredients.findAll({
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
    const ingredientsData = {
        title: req.body.title,
        price: req.body.price,
        unit: req.body.unit
    }

    Ingredients.findOrCreate({
        where: ingredientsData
    }).then(([ingredients, created]) => {
        if (created) {
            res.send({ status: 0, message: `Create success!` });
        } else {
            res.send({ status: 1, message: `${ingredients.title} is already exists!` })
        }
    })


    // Ingredients.findOne({
    //     where: {
    //         title: req.body.title
    //     }
    // })
    //     .then(obj => {
    //         if (!obj) {
    //             res.send({ status: 0, message: "Create success!" })
    //             Ingredients.create(ingredientsData)
    //         } else {
    //             res.send({ status: 1, message: `${req.body.title} is already exists!` })
    //         }
    //     })
    //     .catch(err => {
    //         res.json({ error: err })
    //     })
})

router.put('/update', (req, res) => {
    const ingredientsUpdate = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        unit: req.body.unit
    }
    Ingredients.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(obj => {
            if (obj) {
                res.send({ status: 0, message: "Update success!" })
                obj.update(ingredientsUpdate)
            } else {
                res.send({ status: 1, message: `${req.body.id} doesn't exists` })
            }
        }).catch(err => {
            res.json({ error: err })
        })
})

router.delete('/delete/:id', (req, res) => {
    Ingredients.findOne({
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





