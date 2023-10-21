// Migration for creating the SMEs table
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SMEs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
      },
      wallet: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.STRING,
      },
      industry_type: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the SMEs table
    await queryInterface.dropTable('SMEs');
  },
};
