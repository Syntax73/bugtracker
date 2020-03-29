const { Model, DataTypes } = require('sequelize');

class IssueType extends Model {
  static init(sequelize) {
    super.init(
      { type: DataTypes.ENUM('bug', 'feature', 'duplicate', 'documentation') },
      { sequelize, tableName: 'issue_type' }
    );
  }

  static associate(models) {
    this.belongsTo(models.Issue, { foreignKey: 'issue_id', as: 'issue' });
  }
}

module.exports = IssueType;
