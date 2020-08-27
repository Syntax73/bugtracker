const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  team: yup.array().of(yup.number().min(1)),
});
