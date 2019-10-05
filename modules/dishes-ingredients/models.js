const db = require('../../config/db-connection')
const Sequelize = require('sequelize')

const DishesIngredients = db.sequelize.define(
    'polyfit_dishes_ingredients',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_dishes: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'polyfit_dishes',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        id_ingredients: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'polyfit_ingredients',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
    }
)

module.exports = DishesIngredients
