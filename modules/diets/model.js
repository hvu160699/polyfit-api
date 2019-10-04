const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const Diet = db.sequelize.define(
    'polyfit_diets',
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
        description: {
            type: Sequelize.STRING,
            allowNull: true

        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        id_level: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }
)

module.exports = Diet