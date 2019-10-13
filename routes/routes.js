const userRoute = require('../modules/user/controller')
const historyRoute = require('../modules/history/controller')
const levelRoute = require('../modules/level/controller')
const exercisesRoute = require('../modules/exercises/controller')
const dietsRoute = require('../modules/diets/controller')
const mealsRoute = require('../modules/meals/controller')
const dishesRoute = require('../modules/dishes/controller')
const ingredientsRoute = require('../modules/ingredients/controller')
const quotesRoute = require('../modules/quotes/controller')

const Routes = {
    User: userRoute,
    History: historyRoute,
    Level: levelRoute,
    Exercises: exercisesRoute,
    Diets: dietsRoute,
    Meals: mealsRoute,
    Dishes: dishesRoute,
    Ingredients: ingredientsRoute,
    Quotes: quotesRoute,
}


module.exports = Routes