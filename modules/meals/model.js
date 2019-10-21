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
    }
)

Meals.hasMany(Dish);
Dish.belongsTo(Meals);

module.exports = Meals