const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const Quotes = db.sequelize.define(
    'polyfit_quotes',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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