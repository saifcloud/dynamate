'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING,
        defaultValue:'default.png'
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull:false
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      forget_password: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue:1,
        allowNull:false
      },
      is_deleted: {
        type: Sequelize.INTEGER,
        defaultValue:0,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};