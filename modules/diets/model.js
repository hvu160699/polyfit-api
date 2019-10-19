const Sequelize = require('sequelize')
const sequelize = require('../../config/db-connection')
const Meal = require("../meals/model");

const Diet = sequelize.define(
    'polyfit_diets',
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
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }
)

Diet.hasMany(Meal);
Meal.belongsTo(Diet);

module.exports = Diet