'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'polyfit_exercises_bodyparts',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        id_excersise: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'polyfit_exercises',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        id_bodyparts: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'polyfit_bodyparts',
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
