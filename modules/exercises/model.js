const db = require('../../config/db-connection')
const Sequelize = require('sequelize')

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
    }
)

module.exports = Exercises