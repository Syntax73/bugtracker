const yup = require('yup');

module.exports = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  type: yup.string().matches(/(bug|feature|duplicate|documentation)/),
  priority: yup.string().matches(/(low|medium|high)/),
  severity: yup.string().matches(/(critical|major|moderate|minor|cosmect)/),
});
