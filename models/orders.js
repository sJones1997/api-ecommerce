'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user'
      })
      Orders.belongsToMany(models.Products, {
        through: 'Product_Orders',
        foreignKey: 'order_id',
        as: 'orders' 
      })
    }
  };
  Orders.init({
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};