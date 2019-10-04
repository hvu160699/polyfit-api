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
            allowNull: false
        },
        id_bodyparts: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }
)

module.exports = ExercisesBodyparts