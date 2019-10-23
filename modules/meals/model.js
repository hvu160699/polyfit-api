const dataTypes = require('sequelize').DataTypes
const sequelize = require('../../config/db-connection')
const Dish = require("../dishes/model");

const Meals = sequelize.define(
    'polyfit_meals',
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
    }
)

Meals.hasMany(Dish);
Dish.belongsTo(Meals);

module.exports = Meals