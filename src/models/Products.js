const { Model, DataTypes } = require('sequelize');

class Products extends Model {
	static init(sequelize) {
		super.init(
			{
				product_name: {
					type: DataTypes.STRING,
					allowNull: false
				},
				price: {
					type: DataTypes.DECIMAL(10, 2),
					allowNull: false
				},
				image_url: {
					type: DataTypes.STRING,
					allowNull: false
				},
				section: {
					type: DataTypes.STRING,
					allowNull: true
				},
				ranking: {
					type: DataTypes.DECIMAL(10, 2)
				}
			},
			{
				sequelize
			}
		);
	}
}

module.exports = Products;
