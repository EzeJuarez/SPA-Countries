const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbCon');

module.exports =
  sequelize.define("CountriesActivities", {
    CountryId: {
      type: DataTypes.STRING,
    },
    ActivityId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  },
);
