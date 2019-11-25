const { Model, DataTypes } = require('sequelize');

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: 'project_id',
      through: 'project_users',
      as: 'team',
    });
  }
}

module.exports = Project;
