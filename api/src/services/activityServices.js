require('../models/associations');
const Activity = require('../models/Activity');
const Country = require('../models/Country');

module.exports = {
  createActivityService: async activity => {
    const { countries, ...data } = activity;
    const newActivity = await Activity.create(data);
    for (let i = 0; i < countries.length; i++) {
      const countryDb = await Country.findOne({where: { name: countries[i] }});
      countryDb.addActivity(newActivity);
    };
    return newActivity;
  },
  getActivitiesService: async () => {
    const activities = await Activity.findAll({include: { model: Country }});
    return activities;
  },
  getActivityByNameService: async name => {
    const activity = await Activity.findOne({
      where: sequelize.where(sequelize.fn("lower", sequelize.col("name")), sequelize.fn("lower", name)),
      include: { model: Country },
    });
    return activity;
  },
};
