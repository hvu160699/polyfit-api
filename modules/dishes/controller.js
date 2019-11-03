const express = require('express');
const router = express.Router();
const cors = require('cors')

const Dishes = require('./model')
const Ingredients = require('../ingredients/model')
const Meals = require('../meals/model')
router.use(cors())

router.get('/getAll', (req, res) => {
    Dishes.findAll({
        include: [
            { model: Ingredients, as: 'ingredients' },
            { model: Meals }
        ]
    })
        .then(data => {
            if (data) {
                res.send({ status: 0, message: 'Success!', Response: data })
            } else {
                res.send({ status: 1, message: 'None data!' })
            }
        })
        .catch(err => {
            res.send({ error: err })
        })
})

router.post('/create', (req, res) => {
    const dishesData = {
        title: req.body.title,
        image_url: req.body.image_url,
        protein: req.body.protein,
        fat: req.body.fat,
        carb: req.body.carb,
        calories: req.body.calories,
        description: req.body.description
    }

    Dishes.findOne({
        where: {
            title: req.body.title
        }
    })
        .then(async obj => {
            let ingredientsArr = req.body.ingredientsArr
            if (!obj) {
                const meals = await Meals.findByPk(req.body.id_meals)

                const ingredientsData = ingredientsArr.map(item => {
                    return Ingredients.findByPk(item)
                })

                const dishes = await Dishes.create(dishesData)

                meals.addDishes(dishes).then(result => {
                    if (result)
                        Promise.all(ingredientsData).then(data => {
                            dishes.setIngredients(data).then(() => {
                                res.send({ status: 0, message: 'Create success!' })
                            })
                        })
                })

            } else {
                res.send({ status: 1, message: `${req.body.title} is already exists!` })
            }
        })
        .catch(err => {
            throw new Error(err)
        })
})

router.put('/update', (req, res) => {
    Dishes.findOne({
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
    Dishes.findOne({
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

router.get('/getDishesDetail/:id', async (req, res) => {
    const detail = await Dishes.findOne({
        where: { id: req.params.id },
        include: [
            { model: Ingredients, as: 'ingredients' },
            { model: Meals }
        ]
    });

    res.send({ status: 0, message: 'Success', data: detail });
})

router.get('/getAllDishesByMeal/:id', (req, res) => {
    Dishes.findAll({
        where: {
            polyfitMealId: req.params.id
        }, include: [
            { model: Ingredients, as: 'ingredients' }
        ]
    })
        .then(data => {
            if (data) res.send({ status: 0, message: `Success!`, Response: data })
            else res.send({ status: 1, message: `polyfitMealId: ${req.params.id} doesn't exists!` })
        })
        .catch(err => {
            throw new Error(err)
        })
})

router.get('/getAllDishesByIngredient/:id', (req, res) => {
    Dishes.findAll({
        include: [
            {
                model: Ingredients, as: 'ingredients', where: {
                    id: req.params.id
                }
            },
            {
                model: Meals
            }
        ]
    }).then(data => {
        if (data) res.send({ status: 0, message: `Success!`, Response: data })
        else res.send({ status: 1, message: `Ingredients ID : ${req.params.id} doesn't exists!` })
    })
})

module.exports = router





