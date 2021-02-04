'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Jobsite}) {
      // define association here
      this.hasMany(Jobsite,{foreignKey:'user_id',sourceKey:'id',as:'jobsite'});

    }
  };
  User.init({
    image: DataTypes.STRING,
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    type:DataTypes.INTEGER,
    created_by:DataTypes.INTEGER,
    forget_password: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};