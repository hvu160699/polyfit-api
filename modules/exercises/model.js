const db = require('../../config/db-connection')
const Sequelize = require('sequelize')
const ExercisesBodyparts = require('../exercises-bodyparts/model')
const Bodyparts = require('../bodyparts/model')

const Exercises = db.sequelize.define(
    'polyfit_exercises',
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
        introduction: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING,
        },
        tips: {
            type: Sequelize.STRING,
        },
        sets: {
            type: Sequelize.INTEGER,
        },
        reps: {
            type: Sequelize.INTEGER,
        },
        rest: {
            type: Sequelize.INTEGER,
        },
        video_url: {
            type: Sequelize.STRING,
        },
        image_url: {
            type: Sequelize.STRING,
        },
        id_level: {
            type: Sequelize.INTEGER,
            references: {
                model: 'polyfit_level',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
    })

Exercises.associate = (models) => {
    Exercises.belongsToMany(models.Bodyparts, {
        through: 'polyfit_exercises_bodyparts',
        as: 'exBodypart',
        foreignKey: 'id'
    });
}

module.exports = Exercises