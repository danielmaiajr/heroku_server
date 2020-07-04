'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('addresses', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			customer_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'customers', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			neightborhood: {
				type: Sequelize.STRING,
				allowNull: false
			},
			street: {
				type: Sequelize.STRING,
				allowNull: false
			},
			num: {
				type: Sequelize.STRING,
				allowNull: false
			},
			cep: {
				type: Sequelize.STRING,
				allowNull: false
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('addresses');
	}
};
