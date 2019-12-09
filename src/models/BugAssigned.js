const { Model } = require('sequelize');

class BugAssigned extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Bug, { foreignKey: 'bug_id', as: 'bug' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = BugAssigned;
