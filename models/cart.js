'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carts.belongsToMany(models.Products, {
        through: 'products_cart',
        foreignKey: 'cart_id',
        as: 'cart'
      });
      Carts.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'users'        
      })

    }
  };
  Carts.init({
    user_id: DataTypes.INTEGER    
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};