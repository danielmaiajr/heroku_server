let config;

if (process.env.DATABASE_URL) {
	// the application is executed on Heroku ... use the postgres database
	config = process.env.DATABASE_URL;
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
