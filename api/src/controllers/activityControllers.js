const activityServices = require('../services/activityServices');
const catchAsync = require('../utils/catchAsync');

const createActivityController = async (req, res) => {
  const newActivity = await activityServices.createActivityService(req.body);
  res.status(201).json({ msg: "Activity created succesfully", newActivity});
};

const getActivitiesController = async (req, res) => {
  const { name } = req.query;
  if(name) {
    const activity = await activityServices.getActivityByNameService(name);
    activity ? res.status(200).json(activity) : res.status(200).json({ msg: "Activity not found" });
  }else {
    const activities = await activityServices.getActivitiesService();
    activities.length ? res.status(200).json(activities) : res.status(200).json({ msg: "No activities yet" });
  };
};

module.exports = {
  createActivityController: catchAsync(createActivityController),
  getActivitiesController: catchAsync(getActivitiesController),
};
