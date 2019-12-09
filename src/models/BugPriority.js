const { Model, DataTypes } = require('sequelize');

class BugPriority extends Model {
  static init(sequelize) {
    super.init(
      { priority: DataTypes.ENUM('low', 'medium', 'high') },
      { sequelize, tableName: 'bug_priority' }
    );
  }

  static associate(models) {
    this.belongsTo(models.Bug, { foreignKey: 'bug_id', as: 'bug' });
  }
}

module.exports = BugPriority;
