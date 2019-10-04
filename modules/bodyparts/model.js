const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const BodyParts = db.sequelize.define(
    'polyfit_bodyparts',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: false

        },
    }
)

module.exports = BodyParts