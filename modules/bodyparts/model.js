const dataTypes = require('sequelize').DataTypes;
const sequelize = require('../../config/db-connection');
const Exercises = require("../exercises/model");

const BodyParts = sequelize.define(
    'polyfit_bodyparts',
    {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: dataTypes.STRING,
            allowNull: false
        },
    },
    {
        modelName: 'bodypart',
        underscored: true,
    }
)

module.exports = BodyParts