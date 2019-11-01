const dataTypes = require('sequelize').DataTypes;
const sequelize = require('../../config/db-connection')
const Excercise = require("../exercises/model");
const Diet = require("../diets/model");

const Level = sequelize.define(
    'polyfit_level',
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
        image: {
            type: dataTypes.STRING,
            allowNull: true
        },
        description: {
            type: dataTypes.STRING,
            allowNull: true
        },
    }
)

Level.hasMany(Excercise, { as: 'Exercises' });
Excercise.belongsTo(Level);
Level.hasMany(Diet, { as: 'Diets' });
Diet.belongsTo(Level);

module.exports = Level