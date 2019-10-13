
const db = require('./config/db-connection')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use('/user', routes.User)
app.use('/level', routes.Level)
app.use('/exercises', routes.Exercises)
app.use('/history', routes.History)
app.use('/level', routes.Level)
app.use('/diets', routes.Diets)
app.use('/meals', routes.Meals)
app.use('/dishes', routes.Dishes)
app.use('/ingredients', routes.Ingredients)
app.use('/qoutes', routes.Quotes)


const port = process.env.PORT || 3030
app.listen(port, function () {
  console.log("Listening on " + port)
});
