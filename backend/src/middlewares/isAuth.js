const jwt = require('jsonwebtoken');
const ApiResponse = require('../helpers/apiResponse');

module.exports = (req, res, next) => {
  const reqHeader = req.headers.authorization;
  const http = new ApiResponse(res);

  if (!reqHeader) {
    return http.unauthorized('Token não informado');
  }

  const token = reqHeader.split(' ')[1];

  try {
    const decode = jwt.verify(token, process.env.APP_KEY);
    req.userData = decode;
    return next();
  } catch (err) {
    return http.unauthorized('Token invalido');
  }
};
