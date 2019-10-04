const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const User = db.sequelize.define(
    'polyfit_users',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        display_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        weight: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        height: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        bmi: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        gender: {
            type: Sequelize.INTEGER
        },
        create_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }
)

module.exports = User