const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string().min(4),
  description: yup.string().min(4),
  team: yup.array().of(yup.number().min(1)),
});
