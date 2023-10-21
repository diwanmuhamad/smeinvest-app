'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Migration for adding the relationships between Users, Investments, and InvestmentRelations
    await queryInterface.addColumn('InvestmentRelations', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('InvestmentRelations', 'investment_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Investments',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    // Migration for adding the relationship between Investment and SMEs
    await queryInterface.addColumn('Investments', 'smes_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'SMEs',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    // Drop the relationships
    await queryInterface.removeColumn('InvestmentRelations', 'user_id');
    await queryInterface.removeColumn('InvestmentRelations', 'investment_id');
    await queryInterface.removeColumn('Investments', 'smes_id');
  }
};
