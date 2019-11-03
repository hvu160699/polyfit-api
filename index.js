
const sequelize = require('./config/db-connection')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user', routes.User)
app.use('/exercises', routes.Exercises)
app.use('/history', routes.History)
app.use('/bodyparts', routes.Bodyparts)
app.use('/level', routes.Level)
app.use('/diets', routes.Diets)
app.use('/meals', routes.Meals)
app.use('/dishes', routes.Dishes)
app.use('/ingredients', routes.Ingredients)
app.use('/qoutes', routes.Quotes)
app.use('/routine', routes.Routine)


const port = process.env.PORT || 3030

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// sequelize.sync({ force: true }).then(result => {
//   app.listen(port, function () {
//     console.log("Listening on " + port)
//   });
// }).catch(err => {
//   console.log(err)
// })

app.listen(port, function () {
  console.log("Listening on " + port)
});