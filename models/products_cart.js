'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products_Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here  
      // Products_Cart.belongsTo(models.Carts, {
      //   foreignKey:'cart_id',
      //   as: 'cart'
      // });
      // Products_Cart.belongsTo(models.Products, {
      //   foreignKey:'product_id',
      //   as: 'products'
      // });      
    }
  };
  Products_Cart.init({
    product_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products_Cart',
  });
  return Products_Cart;
};