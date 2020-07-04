const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const testConnection = async (connection) => {
	try {
		await connection.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

const Customer = require('../src/models/Customer');
const Addresses = require('../src/models/Addresses');
const Products = require('../src/models/Products');

const connection = new Sequelize(dbConfig);
testConnection(connection);

Customer.init(connection);
Addresses.init(connection);
Products.init(connection);

Customer.associate(connection.models);
Addresses.associate(connection.models);

module.exports = connection;
