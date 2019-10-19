const Sequelize = require('sequelize')
const sequelize = require('../../config/db-connection')

const Ingredients = sequelize.define(
    'polyfit_ingredients',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        unit: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }
)

module.exports = Ingredients