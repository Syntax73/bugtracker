const { Model, DataTypes } = require('sequelize');

class IssueSeverity extends Model {
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
      { sequelize, tableName: 'issue_severity' }
    );
  }

  static associate(models) {
    this.belongsTo(models.Issue, { foreignKey: 'issue_id', as: 'issue' });
  }
}

module.exports = IssueSeverity;
