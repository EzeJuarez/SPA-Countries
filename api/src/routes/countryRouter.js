const { Router } = require('express');
const countryControllers = require('../controllers/countryControllers');
const countryRouter = Router();

countryRouter.get("/", countryControllers.getCountriesController);
countryRouter.get("/:id", countryControllers.getCountryByIdController);

module.exports = countryRouter;
