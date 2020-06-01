const User = require('../models/User');
const { paginate, buildPagination } = require('../config/paginate');

class UserController {
  async index(req, res) {
    const { page, limit } = req.query;

    const users = await User.findAndCountAll({
      ...paginate({ page, limit }),
    });

    return res.json(buildPagination(users, page, limit));
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    return res.json(user);
  }

  async store(req, res) {
    const { name, email, password, role } = req.body;
    const { filename: avatar } = req.file;

    const user = await User.create({ avatar, name, email, password, role });

    return res.status(201).json(user);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, password, admin } = req.body;

    const reqUser = await User.findByPk(id);

    if (!reqUser) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }

    const user = await reqUser.update({ name, email, password, admin });

    return res.json(user);
  }
}

module.exports = new UserController();
