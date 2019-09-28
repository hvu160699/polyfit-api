
const db = require('./config/db-connection')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const con = db.connection()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

con.connect(function (err) {
    if (err) return console.log(err);
    console.log("Connected!");
});

// app.listen(3030)
