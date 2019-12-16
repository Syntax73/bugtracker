const { Model, DataTypes } = require('sequelize');

class Issue extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        status: DataTypes.ENUM(
          'new',
          'open',
          'in-progress',
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
    this.hasMany(models.IssueAssigned, {
      foreignKey: 'issue_id',
      as: 'assigned',
    });
    this.hasOne(models.IssueSeverity, {
      foreignKey: 'issue_id',
      as: 'severity',
    });
    this.hasOne(models.IssuePriority, {
      foreignKey: 'issue_id',
      as: 'priority',
    });
    this.hasMany(models.IssueComment, {
      foreignKey: 'issue_id',
      as: 'comments',
    });
    this.hasOne(models.IssueType, { foreignKey: 'issue_id', as: 'type' });
  }
}

module.exports = Issue;
