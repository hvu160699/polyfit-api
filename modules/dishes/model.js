const dataTypes = require('sequelize').DataTypes
const sequelize = require('../../config/db-connection')
const Ingredient = require("../ingredients/model");

const Dishes = sequelize.define(
    'polyfit_dishes',
    {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        protein: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        fat: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        carb: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        calories: {
            type: dataTypes.FLOAT,
            defaultValue: 0
        },
        description: {
            type: dataTypes.STRING,
        }
    },
)

Dishes.belongsToMany(Ingredient, { as: 'ingredients', through: 'polyfit_dishes_ingredients' });
Ingredient.belongsToMany(Dishes, { as: 'dishes', through: 'polyfit_dishes_ingredients' });

module.exports = Dishes