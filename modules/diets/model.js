const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const Diet = db.sequelize.define(
    'polyfit_diets',
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
            references: {
                model: 'polyfit_level',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
    }
)

module.exports = Diet