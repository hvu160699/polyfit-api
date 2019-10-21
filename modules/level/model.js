const Sequelize = require('sequelize')
const sequelize = require('../../config/db-connection')
const Excercise = require("../exercises/model");
const Diet = require("../diets/model");

const Level = sequelize.define(
    'polyfit_level',
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
        image: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }
)

Level.hasMany(Excercise, { as: 'Exercises' });
Excercise.belongsTo(Level);
Level.hasMany(Diet);
Diet.belongsTo(Level);

module.exports = Level