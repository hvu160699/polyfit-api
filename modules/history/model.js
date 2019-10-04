const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const History = db.sequelize.define(
    'polyfit_history',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        create_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        bmi: {
            type: Sequelize.FLOAT,
            allowNull: false

        },
        id_level: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
)

module.exports = History