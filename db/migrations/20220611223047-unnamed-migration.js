'use strict';
const { DataTypes } = require('sequelize');
const { USER_TABLE } = require("../models/user.model");

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'recovery_token'
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
