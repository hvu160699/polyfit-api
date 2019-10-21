const Sequelize = require('sequelize')
const sequelize = require('../../config/db-connection')
const Ingredient = require("../ingredients/model");

const Dishes = sequelize.define(
    'polyfit_dishes',
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
        image_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        protein: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        fat: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        carb: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        calories: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
    }
)

Dishes.belongsToMany(Ingredient, { through: 'polyfit_dishes_ingredients', as: 'ingredients' });
Ingredient.belongsToMany(Dishes, { through: 'polyfit_dishes_ingredients', as: 'dishes' });

module.exports = Dishes