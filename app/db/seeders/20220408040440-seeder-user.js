'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync('rahasia', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'admin@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Yogi Delfiandra',
          email: 'yogidelfiandra@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
