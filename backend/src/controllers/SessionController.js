const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../helpers/apiResponse');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!user) return ApiResponse.unauthorized('Usuario não encontrado', res);

    if (!(await user.checkPassword(password))) {
      return ApiResponse.unauthorized('Senha incorreta', res);
    }

    const token = user.generateToken();
    user.setAttributes('password');

    return ApiResponse.created({ user, token }, res);
  }

  async validateSession(req, res) {
    const sessionHeader = req.headers.authorization;
    const token = sessionHeader.split(' ')[1];

    try {
      const decode = jwt.verify(token, process.env.APP_KEY);

      const user = await User.findOne({
        where: { id: decode.id },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });

      return ApiResponse.ok({ user, token }, res);
    } catch (err) {
      return ApiResponse.unauthorized('Senha incorreta', res);
    }
  }
}

module.exports = new SessionController();
