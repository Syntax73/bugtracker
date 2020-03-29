const { Model, DataTypes } = require('sequelize');

class IssueComment extends Model {
  static init(sequelize) {
    super.init({ comment: DataTypes.TEXT }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Issue, { foreignKey: 'issue_id', as: 'issue' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = IssueComment;
