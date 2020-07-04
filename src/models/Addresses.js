const { Model, DataTypes } = require('sequelize');

class Addresses extends Model {
	static init(sequelize) {
		super.init(
			{
				neightborhood: {
					type: DataTypes.STRING,
					allowNull: false
				},
				street: {
					type: DataTypes.STRING,
					allowNull: false
				},
				num: {
					type: DataTypes.STRING,
					allowNull: false
				},
				cep: {
					type: DataTypes.STRING,
					allowNull: false
				}
			},
			{
				sequelize
			}
		);
	}
	static associate(models) {
		this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customers' });
	}
}

module.exports = Addresses;
