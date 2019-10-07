const userRoute = require('../modules/user/controller')
const historyRoute = require('../modules/history/controller')
const levelRoute = require('../modules/level/controller')
const exercisesRoute = require('../modules/exercises/controller')

const Routes = {
    User: userRoute,
    History: historyRoute,
    Level: levelRoute,
    Exercises: exercisesRoute
}


module.exports = Routes