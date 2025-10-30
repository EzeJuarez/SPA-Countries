const nameRegExp = /^(?!\s*$)[\p{L}\s]+$/u;
const difficultyRegExp = /^[1-5]$/;
const durationRegExp = /^[1-9][0-9]{0,3}$/;

export const validate = input => {
  const errors = {};
  if(!nameRegExp.test(input.name)) errors.name = "Name must contain only letters";
  if(!input.name) errors.name = "Name is required";
  if(!difficultyRegExp.test(input.difficulty)) errors.difficulty = "Difficulty should be between 1 to 5";
  if(!input.difficulty) errors.difficulty = "Difficulty is required";
  if(!durationRegExp.test(input.duration)) errors.duration = "Min: 1 - Max: 9999";
  if(!input.duration) errors.duration = "Duration is required";
  if(!input.season.length) errors.season = "Must select at least one season";
  if(!input.countries.length) errors.countries = "Must select at least one country";
  return errors;
};
