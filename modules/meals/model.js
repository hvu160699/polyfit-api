const Sequelize = require('sequelize')
const sequelize = require('../../config/db-connection')
const Dish = require("../dishes/model");

const Meals = sequelize.define(
    'polyfit_meals',
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
        id_diets: {
            type: Sequelize.INTEGER,
            references: {
                model: 'polyfit_diets',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
    }
)

Meals.hasMany(Dish);
Dish.belongsTo(Meals);

module.exports = Meals