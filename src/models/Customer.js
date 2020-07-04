const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
	static init(sequelize) {
		super.init(
			{
				email: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true
				},
				pass_word: {
					type: DataTypes.STRING,
					allowNull: false
				},
				first_name: {
					type: DataTypes.STRING,
					allowNull: false
				},
				last_name: {
					type: DataTypes.STRING,
					allowNull: true
				},
				phone: {
					type: DataTypes.STRING,
					allowNull: true
				},
				cpf: {
					type: DataTypes.STRING,
					allowNull: true
				},
				active: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: false
				}
			},
			{
				sequelize
			}
		);
	}

	static associate(models) {
		this.hasMany(models.Addresses, { foreignKey: 'customer_id', as: 'addresses' });
	}
}

module.exports = Customer;
