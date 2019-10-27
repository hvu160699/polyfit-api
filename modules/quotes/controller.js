const express = require('express');
const router = express.Router();
const cors = require('cors')

const Quotes = require('./model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Quotes.findAll({
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
    const quotesData = {
        title: req.body.title,
        image_url: req.body.image_url,
    }

    Quotes.findOrCreate({
        where: quotesData
    })
        .then(([quotes, created]) => {
            if (created) {
                res.send({ status: 0, message: `Create success!` });
            } else {
                res.send({ status: 1, message: `${quotes.title} is already exists!` })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})

router.put('/update', (req, res) => {
    Quotes.findOne({
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
    Quotes.findOne({
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





