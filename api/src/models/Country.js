const sequelize = require('../config/dbCon');
const { DataTypes } = require('sequelize');

module.exports = 
  sequelize.define("Country", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    flag: {
      type: DataTypes.STRING,
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    continents: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.FLOAT,
    },
    population: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  },
);
