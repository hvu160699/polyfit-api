const userRoute = require('../modules/user/controller')
const historyRoute = require('../modules/history/controller')
const levelRoute = require('../modules/level/controller')
const exercisesRoute = require('../modules/exercises/controller')
const bodypartsRoute = require('../modules/bodyparts/controller')
const dietsRoute = require('../modules/diets/controller')
const mealsRoute = require('../modules/meals/controller')
const dishesRoute = require('../modules/dishes/controller')
const ingredientsRoute = require('../modules/ingredients/controller')
const quotesRoute = require('../modules/quotes/controller')
const routineRoute = require('../modules/routine/controller')

const Routes = {
    User: userRoute,
    History: historyRoute,
    Level: levelRoute,
    Exercises: exercisesRoute,
    Bodyparts: bodypartsRoute,
    Diets: dietsRoute,
    Meals: mealsRoute,
    Dishes: dishesRoute,
    Ingredients: ingredientsRoute,
    Quotes: quotesRoute,
    Routine: routineRoute,
}


module.exports = Routes