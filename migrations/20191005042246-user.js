'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'polyfit_users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        phoneNumber: {
          type: Sequelize.STRING
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        weight: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        height: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        bmi: {
          type: Sequelize.FLOAT,
        },
        gender: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        display_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
      }, {
      timestamps: false
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
    return queryInterface.dropTable('polyfit_users');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
