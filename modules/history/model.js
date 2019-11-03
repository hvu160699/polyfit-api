const dataTypes = require('sequelize').DataTypes
const sequelize = require('../../config/db-connection')

const History = sequelize.define(
    'polyfit_history',
    {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bmi: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
    }
)

module.exports = History