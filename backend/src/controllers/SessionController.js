const jwt = require('jsonwebtoken');
const User = require('../models/User');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!user) return res.status(404).send({ message: 'Email Incorreto' });

    if (!(await user.checkPassword(password))) {
      return res.status(401).send({ message: 'Senha Incorreta' });
    }

    const token = user.generateToken();
    user.setAttributes('password');

    return res.json({ user, token });
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

      res.json({ user, token });
    } catch (err) {
      res.status(401).send();
    }
  }
}

module.exports = new SessionController();
