'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'polyfit_dishes_ingredients',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_dishes: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'polyfit_dishes',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        id_ingredients: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'polyfit_ingredients',
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
    return queryInterface.dropTable("polyfit_dishes_ingredients");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
