'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attraction extends Model {
    static associate(models) {
      Attraction.belongsTo(models.City, {
        foreignKey: 'cityId',
      });
    }
  }
  Attraction.init(
    {
      attraction: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cityId: DataTypes.INTEGER,
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      photo: DataTypes.STRING,
      website: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Attraction',
    }
  );
  return Attraction;
};
