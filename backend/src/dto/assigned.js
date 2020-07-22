const yup = require('yup');

module.exports = yup.object().shape({
  assigned: yup
    .array()
    .of(
      yup.object({
        user_id: yup.number(),
        issue_id: yup.number(),
      })
    )
    .required(),
});
