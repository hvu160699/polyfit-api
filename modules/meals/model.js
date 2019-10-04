const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const Meals = db.sequelize.define(
    'polyfit_meals',
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
        id_diet: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }
)

module.exports = Meals