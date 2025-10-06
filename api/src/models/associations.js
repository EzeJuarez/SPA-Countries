const Country = require('./Country');
const Activity = require('./Activity');
const CountriesActivities = require('./CountriesActivities');

Country.belongsToMany(Activity, { through: CountriesActivities });
Activity.belongsToMany(Country, { through: CountriesActivities });
