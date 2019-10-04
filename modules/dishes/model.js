const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const Dishes = db.sequelize.define(
    'polyfit_dishes',
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
            allowNull: true,
        },
        id_meal: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }
)

module.exports = Dishes