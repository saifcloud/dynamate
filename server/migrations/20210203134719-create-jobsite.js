'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobsites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jobsite_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      jobsite_location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      long: {
        type: Sequelize.STRING,
        allowNull: false
      },
      assigned_project_manager: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expected_completion_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      is_deleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
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
    await queryInterface.dropTable('jobsites');
  }
};