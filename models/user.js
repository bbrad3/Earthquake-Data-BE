'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.belongsToMany(models.location, {through: 'savedLocation'})
    }
  };
  user.init({
    username: {
      type: DataTypes.TEXT,
      validate: {
        isAlphanumeric: true,
        len: [4,20]
      }
    },
    email: {
      type: DataTypes.TEXT,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      validate: {
        len: [4,20]
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};