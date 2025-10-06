const sequelize = require('../config/dbCon');
const Country = require('../models/Country');
const Activity = require('../models/Activity');

module.exports = {
  getCountriesService: async () => {
    const countries = await Country.findAll({include: { model: Activity }});
    return countries;
  },
  getCountryByNameService: async name => {
    const country = await Country.findOne({
      where: sequelize.where(sequelize.fn("lower", sequelize.col("name")), sequelize.fn("lower", name)),
      include: { model: Activity },
    });
    return country;
  },
  getCountryByIdService: async id => {
    const country = await Country.findByPk(id, {include: { model: Activity }});
    return country;
  },
};
