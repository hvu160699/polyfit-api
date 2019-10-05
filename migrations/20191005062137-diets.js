'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'polyfit_diets',
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
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        image_url: {
          type: Sequelize.STRING,
          allowNull: true
        },
        id_level: {
          type: Sequelize.INTEGER,
          references: {
            model: 'polyfit_level',
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
    return queryInterface.dropTable("polyfit_diets");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
