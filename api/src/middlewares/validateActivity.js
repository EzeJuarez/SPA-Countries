const { nameRegExp, difficultyRegExp, durationRegExp } = require('../utils/regExp');

module.exports = (req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body;
  if (!name || !nameRegExp(name)) return res.status(400).json({ error: "The 'name' field must contain letters and cannot be empty" });
  if (!difficulty || !difficultyRegExp(difficulty)) return res.status(400).json({ error: "The difficulty should be a number from 1 to 5" });
  if (!duration || !durationRegExp(duration)) return res.status(400).json({ error: "The duration must be a number greater than 0 and less than 1000" });
  if (!Array.isArray(season) || season.length === 0 || !season[0]) return res.status(400).json({ error: "You must select at least one season" });
  if (!Array.isArray(countries) || countries.length === 0 || !countries[0]) return res.status(400).json({ error: "You must select at least one country" });
  next();
};
