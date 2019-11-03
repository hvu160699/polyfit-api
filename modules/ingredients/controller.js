const express = require('express');
const router = express.Router();
const cors = require('cors')

const Ingredients = require('./model')
const Dishes = require('../dishes/model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Ingredients.findAll()
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

// router.get("/getAllDishesByIngredient/:id", (req, res) => {
//     Ingredients.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [
//             { model: Dishes, as: "dishes" }
//         ]
//     }).then(data => res.send(data))
// })

router.post("/create", (req, res) => {
    const ingredientsData = {
        title: req.body.title,
        image_url: req.body.image_url
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
})

router.put('/update', (req, res) => {
    Ingredients.findOne({
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
    Ingredients.findOne({
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





