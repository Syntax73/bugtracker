const yup = require('yup');

module.exports = yup.object().shape({
  assigned: yup.number().required(),
});
