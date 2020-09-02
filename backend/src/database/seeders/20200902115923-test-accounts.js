module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Test Account 1',
          email: 'test@email.com',
          password:
            '$2b$10$r0hzqopEB.lDDFaYwS34VOvEFX8c/sM0N2ra5KUbPGXYo1xQms5Cy',
          role: 'test',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Test Account 2',
          email: 'test2@email.com',
          password:
            '$2b$10$r0hzqopEB.lDDFaYwS34VOvEFX8c/sM0N2ra5KUbPGXYo1xQms5Cy',
          role: 'test_admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const { Op } = Sequelize;
    return queryInterface.bulkDelete(
      'users',
      { name: { [Op.like]: '%Test Account%' } },
      {}
    );
  },
};
