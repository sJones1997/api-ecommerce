'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsToMany(models.Orders, {
        through: 'Products_Orders',
        as: 'products',
        foreignKey: 'product_id'
      });
      Products.belongsToMany(models.Carts, {
        through: 'products_cart',
        foreignKey: 'product_id',
        as: 'product'
      });
    }
  };
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};