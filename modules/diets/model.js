const dataTypes = require('sequelize').DataTypes
const sequelize = require('../../config/db-connection')
const Meal = require("../meals/model");

const Diet = sequelize.define(
    'polyfit_diets',
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
        description: {
            type: dataTypes.STRING,
            allowNull: true
        },
        image_url: {
            type: dataTypes.STRING,
            allowNull: true
        },
    },
)

Diet.hasMany(Meal, { as: "Meals" });
Meal.belongsTo(Diet);

module.exports = Diet