let config;

if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
	// the application is executed on Heroku ... use the postgres database
	config = {
		dialect: 'postgres',
		protocol: 'postgres',
		port: match[4],
		host: match[3],
		define: {
			timestamps: true,
			underscored: true
		}
	};
} else {
	config = {
		dialect: 'postgres',
		host: 'localhost',
		username: 'postgres',
		password: '123456',
		database: 'test_store',
		define: {
			timestamps: true,
			underscored: true
		}
	};
}

module.exports = config;
