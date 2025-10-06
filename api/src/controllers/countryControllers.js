const countryServices = require('../services/countryServices');
const catchAsync = require('../utils/catchAsync');

const getCountriesController = async (req, res) => {
  const { name } = req.query;
  if(name) {
    const country = await countryServices.getCountryByNameService(name);
    country ? res.status(200).json(country) : res.status(400).json({ msg: `Country not found with name: ${name}` });
  }else {
    const countries = await countryServices.getCountriesService();
    res.status(200).json(countries);
  };
};

const getCountryByIdController = async (req, res) => {
  const { id } = req.params;
  const country = await countryServices.getCountryByIdService(id.toUpperCase());
  country ? res.status(200).json(country) : res.status(400).json({ msg: `Country not found with id: ${id}` });
};

module.exports = {
  getCountriesController: catchAsync(getCountriesController),
  getCountryByIdController: catchAsync(getCountryByIdController),
};
