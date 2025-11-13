const { Router } = require('express');
const countryRouter = require('./countryRouter');
const activityRouter = require('./activityRouter');
const router = Router();

router.use("/countries", countryRouter);
router.use("/activity", activityRouter);
router.use("/ping", (req, res) => {
  res.status(200).json("OK");
});

module.exports = router;
