const Sequelize = require('sequelize')
const db = require('../../config/db-connection')

const ExercisesBodyparts = db.sequelize.define(
    'polyfit_exercises_bodyparts',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_excersise: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'polyfit_exercises',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        id_bodyparts: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'polyfit_bodyparts',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
    }
)

module.exports = ExercisesBodyparts