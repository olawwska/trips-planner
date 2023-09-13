'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AttractionsRating extends Model {
    static associate(models) {
      AttractionsRating.belongsTo(models.Attraction, {
        foreignKey: 'attractionId',
      });
    }
  }
  AttractionsRating.init(
    {
      attractionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      rating: {
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
      modelName: 'AttractionsRating',
    }
  );
  return AttractionsRating;
};
