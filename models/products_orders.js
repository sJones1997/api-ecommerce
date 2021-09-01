'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products_Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Products_Orders.hasMany(models.Products, {
      //   foreignKey: 'product_id',
      //   as: 'products'
      // });
      // Products_Orders.hasMany(models.Orders, {
      //   foreignKey: 'order_id',
      //   as: 'orders'
      // })
    }
  };
  Products_Orders.init({
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products_Orders',
  });
  return Products_Orders;
};