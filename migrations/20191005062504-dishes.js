'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'polyfit_dishes',
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
        image_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        protein: {
          type: Sequelize.FLOAT,
          defaultValue: 0
        },
        fat: {
          type: Sequelize.FLOAT,
          defaultValue: 0
        },
        carb: {
          type: Sequelize.FLOAT,
          defaultValue: 0
        },
        calories: {
          type: Sequelize.FLOAT,
          defaultValue: 0
        },
        id_meals: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'polyfit_meals',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
      }
    )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
