// Migration for creating the InvestmentRelations table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InvestmentRelations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      status: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the InvestmentRelations table
    await queryInterface.dropTable('InvestmentRelations');
  },
};
