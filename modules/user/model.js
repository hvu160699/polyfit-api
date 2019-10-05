const Sequelize = require('sequelize')
const db = require('../../config/db-connection')
const History = require('../history/model')

const User = db.sequelize.define(
    'polyfit_users',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        weight: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        height: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        bmi: {
            type: Sequelize.FLOAT,
        },
        gender: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        display_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
)

// User.hasMany(History, { foreignKey: 'id_user' })

module.exports = User