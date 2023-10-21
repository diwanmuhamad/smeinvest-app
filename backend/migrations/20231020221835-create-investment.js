// Migration for creating the Investments table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Investments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      investment_target: {
        type: Sequelize.FLOAT,
      },
      current_investment: {
        type: Sequelize.FLOAT,
      },
      return_expectation: {
        type: Sequelize.INTEGER,
      },
      start_at: {
        type: Sequelize.DATE,
      },
      end_at: {
        type: Sequelize.DATE,
      },
      investment_status: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the Investments table
    await queryInterface.dropTable('Investments');
  },
};
