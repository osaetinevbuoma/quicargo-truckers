'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('trucks', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
      },
      model: Sequelize.DataTypes.STRING,
      year: Sequelize.DataTypes.INTEGER,
      license_plate: Sequelize.DataTypes.STRING,
      current_km: Sequelize.DataTypes.DOUBLE.ZEROFILL,
      max_load: Sequelize.DataTypes.DOUBLE.ZEROFILL,
      fuel_type: Sequelize.DataTypes.STRING,
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });

    await queryInterface.createTable('locations', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
      },
      latitude: Sequelize.DataTypes.DOUBLE.ZEROFILL,
      longitude: Sequelize.DataTypes.DOUBLE.ZEROFILL,
      location_datetime: Sequelize.DataTypes.DATE,
      truck_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'trucks',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
