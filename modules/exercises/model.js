const db = require('../../config/db-connection')
const Sequelize = require('sequelize')

const Exercises = db.sequelize.define(
    'polyfit_exercises',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        introduction: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tips: {
            type: Sequelize.STRING,
            allowNull: true
        },
        sets: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        reps: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        video_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        id_levels: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
)

module.exports = Exercises