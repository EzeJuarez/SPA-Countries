module.exports = {
  nameRegExp: name => /^(?!\s*$)[a-zA-Z\s]+$/.test(name),
  difficultyRegExp: difficulty => /^[1-5]$/.test(difficulty),
  durationRegExp: duration => /^[1-9][0-9]{0,3}$/.test(duration),
};
