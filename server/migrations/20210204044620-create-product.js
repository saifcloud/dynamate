'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING,
        defaultValue:'/products/default.png'
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      dimension: {
        type: Sequelize.STRING,
        // allowNull:false
      },
      color: {
        type: Sequelize.STRING,
        allowNull:false
      },
      material_type: {
        type: Sequelize.STRING
      },
      water_resistant: {
        type: Sequelize.STRING,
        allowNull:false
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue:1
      },
      is_deleted: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('products');
  }
};