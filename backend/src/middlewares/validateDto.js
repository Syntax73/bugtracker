const apiResponse = require('../helpers/apiResponse');

function validateDto(schema) {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body);
      req.body = validatedBody;
      next();
    } catch (err) {
      next(apiResponse.badResquest(err.message));
    }
  };
}

module.exports = validateDto;
