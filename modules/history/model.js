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
        bmi: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        id_user: {
            type: Sequelize.INTEGER,
            references: {
                model: 'polyfit_users',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
    }
)

module.exports = History