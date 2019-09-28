
const db = require('./config/db-connection')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.connect(function (err) {
    if (err) return err
    console.log("Connected to database");
})

app.use('/user', routes.User)

app.listen(3030)
