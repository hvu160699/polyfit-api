const db = require('../../config/db-connection')
const Sequelize = require('sequelize')

const DishesIngredients = db.sequelize.define(
    'polyfit_dishes_ingredients',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_dishes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_ingredients: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }
)

module.exports = DishesIngredients
