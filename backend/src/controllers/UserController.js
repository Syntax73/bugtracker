const User = require('../models/User');
const { paginate, buildPagination } = require('../helpers/paginate');

class UserController {
  async index(req, res) {
    const { page } = req.query;
    const limit = 10;

    const users = await User.findAndCountAll({
      ...paginate(page, limit),
    });

    return res.json(buildPagination(users, page, limit));
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    return res.json(user);
  }

  async store(req, res) {
    const { name, email, password, confirmPassword, role } = req.body;
    const { filename: avatar } = req.file;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Senhas não combinam' });
    }

    const user = await User.create({ avatar, name, email, password, role });

    return res.status(201).json(user);
  }

  // TODO fazer o usuario atualizar o avatar
  async update(req, res) {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const reqUser = await User.findByPk(id);

    if (!reqUser) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }

    const user = await reqUser.update({ name, email, password, role });

    return res.json(user);
  }
}

module.exports = new UserController();
