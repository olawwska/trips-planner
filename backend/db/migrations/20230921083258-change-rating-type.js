'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('AttractionsRatings', 'rating', {
      type: DataTypes.FLOAT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('AttractionsRatings', 'rating', {
      type: DataTypes.INTEGER,
    });
  },
};
