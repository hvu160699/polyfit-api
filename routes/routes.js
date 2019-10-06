const userRoute = require('../modules/user/controller')
const historyRoute = require('../modules/history/controller')
const levelRoute = require('../modules/level/controller')

const Routes = {
    User: userRoute,
    History: historyRoute,
    Level: levelRoute
}


module.exports = Routes