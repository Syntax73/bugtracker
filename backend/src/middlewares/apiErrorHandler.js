const apiResponse = require('../helpers/apiResponse');

function apiErrorHandler(err, req, res, next) {
  if (err instanceof apiResponse) {
    return res.status(err.code).json(err.message);
  }

  return res.status(500).json('Erro interno');
}

module.exports = apiErrorHandler;
