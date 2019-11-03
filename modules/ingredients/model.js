const dataTypes = require('sequelize').DataTypes
const sequelize = require('../../config/db-connection')

const Ingredients = sequelize.define(
    'polyfit_ingredients',
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
    }
)

module.exports = Ingredients