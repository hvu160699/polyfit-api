const dataTypes = require('sequelize').DataTypes
const sequelize = require('../../config/db-connection')

const Routine = sequelize.define(
    'polyfit_routine',
    {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        step_count: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        time_pratice: {
            type: dataTypes.STRING,
            allowNull: false,
            defaultValue: null,
        },
        calories_consumed: {
            type: dataTypes.STRING,
            allowNull: false,
            defaultValue: null,
        }
    }
)

module.exports = Routine