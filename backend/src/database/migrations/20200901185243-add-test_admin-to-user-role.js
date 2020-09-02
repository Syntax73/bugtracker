const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return replaceEnum({
      queryInterface,
      tableName: 'users',
      columnName: 'role',
      defaultValue: 'developer',
      newValues: [
        'developer',
        'test_lead',
        'project_lead',
        'admin',
        'test',
        'test_admin',
      ],
      enumName: 'enum_users_role',
    });
  },

  down: (queryInterface, Sequelize) => {
    return replaceEnum({
      queryInterface,
      tableName: 'users',
      columnName: 'role',
      defaultValue: 'developer',
      newValues: ['developer', 'test_lead', 'project_lead', 'admin', 'test'],
      enumName: 'enum_users_role',
    });
  },
};
