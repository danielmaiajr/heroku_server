'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('products', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			product_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false
			},
			image_url: {
				type: Sequelize.STRING,
				allowNull: false
			},
			section: {
				type: Sequelize.STRING,
				allowNull: false
			},
			ranking: {
				type: Sequelize.DECIMAL(10, 2)
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
		await queryInterface.dropTable('products');
	}
};
