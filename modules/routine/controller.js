const express = require('express');
const router = express.Router();
const cors = require('cors')

const Routine = require('./model')
const User = require('../user/model')
router.use(cors())

router.get("/getAll", (req, res) => {
    Routine.findAll()
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

router.get("/getRoutinesByUserId/:id", (req, res) => {
    Routine.findAll({
        where: {
            polyfitUserId: req.params.id
        }
    })
        .then(data => {
            if (data) res.send({ status: 0, message: "Success!", Response: data })
            else res.send({ status: 0, message: `ID User : ${req.params.id} doesn't exist!` })
        })
        .catch(err => {
            throw new Error(err)
        })
})

router.post("/create", async (req, res) => {
    const routineData = {
        step_count: req.body.step_count,
        time_practice: req.body.time_practice,
        calories_consumed: req.body.calories_consumed,
        create_date: req.body.create_date,
    }

    const user = await User.findByPk(req.body.id_user);

    user.createRoutine(routineData)
        .then(data => {
            if (data) {
                res.send({ status: 0, message: "Create success!" })
            } else {
                res.send({ status: 1, message: `Failed!` })
            }
        })
        .catch(err => {
            throw new Error("Failed to delete!")
        })
})

router.delete('/delete/:id', (req, res) => {
    Routine.findOne({
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