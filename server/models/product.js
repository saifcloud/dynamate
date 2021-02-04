'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product_size}) {
      // define association here
      this.hasMany(Product_size,{foreignKey:'product_id',sourceKey:'id', as:'product_size'})
    }
  };
  Product.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    size_id: DataTypes.STRING,
    color: DataTypes.STRING,
    material_type: DataTypes.STRING,
    water_resistant: DataTypes.STRING,
    status: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:'products',
    modelName: 'Product',
  });
  return Product;
};