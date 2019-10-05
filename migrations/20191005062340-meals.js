'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'polyfit_meals',
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
        id_diets: {
          type: Sequelize.INTEGER,
          references: {
            model: 'polyfit_diets',
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
    return queryInterface.dropTable("polyfit_meals");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
