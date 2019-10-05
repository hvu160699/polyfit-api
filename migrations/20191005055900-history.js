'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'polyfit_history',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        bmi: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        id_user: {
          type: Sequelize.INTEGER,
          references: {
            model: 'polyfit_users',
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
   return queryInterface.dropTable('polyfit_history');
  }
};
