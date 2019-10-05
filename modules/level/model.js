const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const Level = db.sequelize.define(
    'polyfit_level',
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
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }
)

module.exports = Level