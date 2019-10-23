const dataTypes = require('sequelize').DataTypes
const sequelize = require('../../config/db-connection')

const Quotes = sequelize.define(
    'polyfit_quotes',
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
            allowNull: true
        },
    }
)

module.exports = Quotes