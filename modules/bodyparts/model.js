const dataTypes = require('sequelize').DataTypes;
const sequelize = require('../../config/db-connection');

const Bodyparts = sequelize.define(
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
)

module.exports = Bodyparts