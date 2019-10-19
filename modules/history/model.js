const Sequelize = require('sequelize')
const sequelize = require('../../config/db-connection')
const User = require("../user/model");

const History = sequelize.define(
    'polyfit_history',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bmi: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
    }
)

module.exports = History