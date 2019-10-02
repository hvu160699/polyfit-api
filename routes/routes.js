const userRoute = require('../modules/user/controller')
const historyRoute = require('../modules/history/controller')


const Routes = {
    User: userRoute,
    History:historyRoute
}


module.exports = Routes