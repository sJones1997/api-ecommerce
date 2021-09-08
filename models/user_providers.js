'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_providers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_providers.belongsTo(models.Users);
      user_providers.belongsTo(models.profile_providers);

    }
  };
  user_providers.init({
    user_id: DataTypes.INTEGER,
    profile_provider_id: DataTypes.INTEGER,
    provider_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_providers',
  });
  return user_providers;
};