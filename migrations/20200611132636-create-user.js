'use strict';

const { prefix } = require('../config').database;
const tableName = prefix + 'users';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(tableName, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        remember_token: {
          type: Sequelize.STRING,
        },
        api_token: {
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addIndex(tableName, ['remember_token'], {
          unique: true,
        }),
      )
      .then(() =>
        queryInterface.addIndex(tableName, ['api_token'], { unique: true }),
      )
      .then(() =>
        queryInterface.addIndex(tableName, ['email'], { unique: true }),
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  },
};
