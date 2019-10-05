'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'polyfit_exercises',
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
        introduction: {
          type: Sequelize.STRING,
        },
        content: {
          type: Sequelize.STRING,
        },
        tips: {
          type: Sequelize.STRING,
        },
        sets: {
          type: Sequelize.INTEGER,
        },
        reps: {
          type: Sequelize.INTEGER,
        },
        video_url: {
          type: Sequelize.STRING,
        },
        image_url: {
          type: Sequelize.STRING,
        },
        id_level: {
          type: Sequelize.INTEGER,
          references: {
            model: 'polyfit_level',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
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
    return queryInterface.dropTable("polyfit_exercises");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
