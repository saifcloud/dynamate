'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    order_id: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    size: DataTypes.STRING,
    site: DataTypes.TEXT,
    expected_receiving_date: DataTypes.DATE,
    transaction_id: DataTypes.STRING,
    delivery_status: DataTypes.INTEGER,
    payment_status: DataTypes.INTEGER,
    delivery_date: DataTypes.DATE
  }, {
    sequelize,
    tableName:'orders',
    modelName: 'Order',
  });
  return Order;
};