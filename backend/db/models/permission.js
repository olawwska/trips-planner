'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsTo(models.City, {
        foreignKey: 'cityId',
      });
    }
  }
  Permission.init(
    {
      cityId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      googleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Permission',
    }
  );
  return Permission;
};
