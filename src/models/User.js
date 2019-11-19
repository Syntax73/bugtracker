const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fix virtual field
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar: DataTypes.STRING,
        avatar_url: DataTypes.VIRTUAL,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    super.addHook('beforeCreate', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    });
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  generateToken() {
    return jwt.sign(
      { id: this.id, email: this.email, admin: this.admin },
      process.env.APP_KEY,
      { expiresIn: '2 days' }
    );
  }
}

module.exports = User;
