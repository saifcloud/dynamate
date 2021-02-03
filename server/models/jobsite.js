'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jobsite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Jobsite.init({
    jobsite_name: DataTypes.STRING,
    jobsite_location: DataTypes.STRING,
    lat:DataTypes.STRING,
    long:DataTypes.STRING,
    assigned_project_manager: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    expected_completion_date: DataTypes.DATE,
    status: DataTypes.INTEGER,
    is_deleted: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:'jobsites',
    modelName: 'Jobsite',
  });
  return Jobsite;
};