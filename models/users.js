'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Orders, {
        foreignKey: 'user_id',
        as: 'user'
      })
      Users.hasMany(models.Carts, {
        foreignKey: 'user_id',
        as: 'users'
      });
      Users.hasOne(models.user_providers, {
        foreignKey: 'user_id',
        as: 'user_provider'
      });
    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    local_account: DataTypes.INTEGER    
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};