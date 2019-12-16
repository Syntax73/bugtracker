const { Model } = require('sequelize');

class IssueAssigned extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Issue, { foreignKey: 'issue_id', as: 'issue' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = IssueAssigned;
