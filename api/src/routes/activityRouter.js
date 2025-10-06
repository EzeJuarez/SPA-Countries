const { Router } = require('express');
const activityControllers = require('../controllers/activityControllers');
const validateActivity = require('../middlewares/validateActivity');
const activityRouter = Router();

activityRouter.post("/", validateActivity, activityControllers.createActivityController);
activityRouter.get("/", activityControllers.getActivitiesController);

module.exports = activityRouter;
