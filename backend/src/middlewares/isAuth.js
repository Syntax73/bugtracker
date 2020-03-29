const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const reqHeader = req.headers.authorization;

  if (!reqHeader) {
    return res.status(401).json({ message: 'Token não informado' });
  }

  const token = reqHeader.split(' ')[1];

  try {
    const decode = jwt.verify(token, process.env.APP_KEY);
    req.userData = decode;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalido' });
  }
};
