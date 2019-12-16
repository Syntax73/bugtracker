const { Model, DataTypes } = require('sequelize');

class IssuePriority extends Model {
  static init(sequelize) {
    super.init(
      { priority: DataTypes.ENUM('low', 'medium', 'high') },
      { sequelize, tableName: 'issue_priority' }
    );
  }

  static associate(models) {
    this.belongsTo(models.Issue, { foreignKey: 'issue_id', as: 'issue' });
  }
}

module.exports = IssuePriority;
