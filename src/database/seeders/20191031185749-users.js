module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          email: 'admin@adm.com',
          password:
            '$2b$10$UsfkamXYROf8rEYT8QR.D.M7Ng9hv9zOZ.bJZQxSAJyoPI4ECk7q2',
          admin: true,
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
