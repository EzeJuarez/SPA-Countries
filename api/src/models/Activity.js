const sequelize = require('../config/dbCon');
const { DataTypes } = require('sequelize');

module.exports =
  sequelize.define("Activity", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    season: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    timestamps: false,
  },
);
