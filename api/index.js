require('dotenv').config();
const sequelize = require('./src/config/dbCon');
const app = require('./src/server');
const { PORT } = process.env;
const axios = require('axios');
const Country = require('./src/models/Country');

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT || 3000, async () => {
    try {
      const countriesApi = await axios.get("https://restcountries.com/v3.1/independent?status=true");
      countriesApi.data.forEach(country => Country.create({
        id: country.cca3,
        name: country.name.common,
        flag: country.flags.svg,
        capital: country.capital,
        continents: country.continents,
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      }));
    } catch(error) {
      console.log(error);
    }
    console.log("Server on port", PORT || 3000);
  });
}).catch(error => {
  console.error("Unable to connect to the database:", error);
});
