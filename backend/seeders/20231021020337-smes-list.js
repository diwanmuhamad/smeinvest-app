'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const smeData = [
      {
        username: 'SMEs 1',
        wallet: 'darksunset743763@getalby.com',
        photo: '1.jpg',
        industry_type: 'F&B',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'SMEs 2',
        wallet: 'shydarkness243240@getalby.com',
        photo: '2.jpg',
        industry_type: 'Food Stall',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'SMEs 3',
        wallet: 'darksunset743763@getalby.com',
        photo: '3.jpg',
        industry_type: 'Spa',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
    // Insert the data into the 'SMEs' table
    await queryInterface.bulkInsert('SMEs', smeData, {});
  },

  async down (queryInterface, Sequelize) {
    // Remove the seeded data, if needed
    await queryInterface.bulkDelete('SMEs', null, {});
  }
};
