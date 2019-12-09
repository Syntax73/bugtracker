const { Model, DataTypes } = require('sequelize');

class BugSeverity extends Model {
  static init(sequelize) {
    super.init(
      {
        severity: DataTypes.ENUM(
          'critical',
          'major',
          'moderate',
          'minor',
          'cosmect'
        ),
      },
      { sequelize, tableName: 'bug_severity' }
    );
  }

  static associate(models) {
    this.belongsTo(models.Bug, { foreignKey: 'bug_id', as: 'bug' });
  }
}

module.exports = BugSeverity;
