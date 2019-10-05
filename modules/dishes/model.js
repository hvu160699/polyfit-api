const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const Dishes = db.sequelize.define(
    'polyfit_dishes',
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
        image_url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        protein: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        fat: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        carb: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        calories: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        id_meals: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'polyfit_meals',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
    }
)

module.exports = Dishes