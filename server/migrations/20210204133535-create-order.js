'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.STRING
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.STRING
      },
      site: {
        type: Sequelize.TEXT
      },
      expected_receiving_date: {
        type: Sequelize.DATE
      },
      transaction_id: {
        type: Sequelize.STRING
      },
      delivery_status: {
        type: Sequelize.INTEGER
      },
      payment_status: {
        type: Sequelize.INTEGER
      },
      delivery_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('orders');
  }
};