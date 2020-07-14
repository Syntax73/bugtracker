const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  team: yup.array().of(yup.number().min(1)),
});
