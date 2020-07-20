const yup = require('yup');

module.exports = yup.object().shape({
  assigned: yup.array().of(yup.number().min(1)).required(),
});
