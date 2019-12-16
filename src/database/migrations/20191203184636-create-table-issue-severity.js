module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('issue_severity', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      issue_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'issues', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      severity: {
        type: Sequelize.ENUM(
          'critical',
          'major',
          'moderate',
          'minor',
          'cosmect'
        ),
        defaultValue: 'minor',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('issue_severity');
  },
};
