const Sequelize = require('sequelize')
const sequelize = require('../../config/db-connection')

const Quotes = sequelize.define(
    'polyfit_quotes',
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
            allowNull: true
        },
    }
)

module.exports = Quotes