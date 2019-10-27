const express = require('express');
const router = express.Router();
const cors = require('cors')

const Routine = require('./model')
const User = require('../user/model')
router.use(cors())

router.post("/create", (req, res) => {
    const routineData = {
        step_count: req.body.step_count,
        time_pratice: req.body.time_pratice,
        image_url: req.body.calories_consumed,
    }

    Routine.findOne({
        where: {
            id_user: req.body.id_user
        }
    })
        .then(async obj => {
            if (!obj) {
                const user = await User.findByPk(req.body.id_user);

                user.createRoutine(routineData).then(result => {
                    res.send({ status: 0, message: `Create success!` })
                }).catch(err => {
                    console.log(err);
                })

            } else {
                res.send({ status: 1, message: `${req.body.id_user} is already exists!` })
            }
        })
        .catch(err => {
            res.json({ error: err })
        })
})
