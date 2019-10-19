const sequelize = require('../../config/db-connection');
const dataTypes = require('sequelize').DataTypes;
const Bodyparts = require('../bodyparts/model');

const Exercises = sequelize.define(
    'polyfit_exercises',
    {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        introduction: {
            type: dataTypes.STRING,
        },
        content: {
            type: dataTypes.STRING,
        },
        tips: {
            type: dataTypes.STRING,
        },
        sets: {
            type: dataTypes.INTEGER,
        },
        reps: {
            type: dataTypes.INTEGER,
        },
        rest: {
            type: dataTypes.INTEGER,
        },
        video_url: {
            type: dataTypes.STRING,
        },
        image_url: {
            type: dataTypes.STRING,
        },
    }, {
    modelName: 'exercises',
    underscored: true,
});

Exercises.belongsToMany(Bodyparts, { through: "polyfit_excercise_bodypart", as: 'bodyparts' });
Bodyparts.belongsToMany(Exercises, { through: "polyfit_excercise_bodypart", as: 'exercises' });

module.exports = Exercises;