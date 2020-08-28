const yup = require('yup');

module.exports = yup.object().shape({
  comment: yup.string().min(1),
});
