const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const Ingredients = db.sequelize.define(
    'polyfit_ingredients',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        calories: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        cabonhydrate: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        fat: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        protein: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        unit: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }
)

module.exports = Ingredients