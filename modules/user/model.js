const dataTypes = require('sequelize').DataTypes
const sequelize = require('../../config/db-connection')
const History = require('../history/model')
const Routine = require('../routine/model')

const User = sequelize.define(
    'polyfit_users',
    {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phoneNumber: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false
        },
        isVerified: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
        },
        isOnline: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        height: {
            type: dataTypes.FLOAT,
            allowNull: false
        },
        bmi: {
            type: dataTypes.FLOAT,
        },
        gender: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        display_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        firebase_token: {
            type: dataTypes.STRING,
            allowNull: true
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: true
        }
    }
)

User.hasMany(History, { as: 'History' })
History.belongsTo(User);
User.hasMany(Routine, { as: 'Routine' })
Routine.belongsTo(User)

module.exports = User