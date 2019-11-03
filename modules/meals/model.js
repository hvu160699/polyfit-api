const dataTypes = require('sequelize').DataTypes
const sequelize = require('../../config/db-connection')
const Dishes = require("../dishes/model");

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
        image_url: {
            type: dataTypes.STRING,
        }
    },
)

Meals.hasMany(Dishes, { as: 'Dishes' });
Dishes.belongsTo(Meals);

module.exports = Meals