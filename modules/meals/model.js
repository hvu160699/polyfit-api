const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const Meals = db.sequelize.define(
    'polyfit_meals',
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
        id_diets: {
            type: Sequelize.INTEGER,
            references: {
                model: 'polyfit_diets',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
    }
)

module.exports = Meals