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
}

module.exports = new SessionController();
