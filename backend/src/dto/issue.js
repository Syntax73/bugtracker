const yup = require('yup');

module.exports = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
  priority: yup.string().required(),
  severity: yup.string().required(),
});
