'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.hasMany(models.Attraction, {
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      City.hasMany(models.Permission, {
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
        hooks: true,
      });
    }
  }
  City.init(
    {
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'City',
    }
  );
  return City;
};
