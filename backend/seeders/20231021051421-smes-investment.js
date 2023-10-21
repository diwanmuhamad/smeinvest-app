'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const investmentData = [
      {
        title: 'Investment into SMEs 1',
        description: 'This is investment into SMEs 1',
        investment_target: 10000,
        current_investment: 0,
        return_expectation: 5,
        start_at: new Date(),
        end_at: new Date(),
        investment_status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Investment into SMEs 2',
        description: 'This is investment into SMEs 2',
        investment_target: 20000,
        current_investment: 0,
        return_expectation: 12,
        start_at: new Date(),
        end_at: new Date(),
        investment_status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
    // Insert the data into the 'Investment' table
    await queryInterface.bulkInsert('Investments', investmentData, {});
  },

  async down (queryInterface, Sequelize) {
    // Remove the seeded data, if needed
    await queryInterface.bulkDelete('Investments', null, {});
  }
};
