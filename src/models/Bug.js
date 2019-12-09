const { Model, DataTypes } = require('sequelize');

class Bug extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        status: DataTypes.ENUM(
          'new',
          'open',
          'rejected',
          'fixed',
          'reopen',
          'closed',
          'deferred'
        ),
        description: DataTypes.TEXT,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'reporter' });
    this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    this.hasMany(models.BugAssigned, { foreignKey: 'bug_id', as: 'assigned' });
    this.hasOne(models.BugSeverity, { foreignKey: 'bug_id', as: 'severity' });
    this.hasOne(models.BugPriority, { foreignKey: 'bug_id', as: 'priority' });
  }
}

module.exports = Bug;
