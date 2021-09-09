'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile_providers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile_providers.hasOne(models.user_providers,{
        foreignKey: 'profile_provider_id',
        as: 'profile_provider'
      });
    }
  };
  profile_providers.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profile_providers',
  });
  return profile_providers;
};