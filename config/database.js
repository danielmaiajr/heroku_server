let config;

if (process.env.DATABASE_URL) {
	// the application is executed on Heroku ... use the postgres database
	config = {
		dialect: 'postgres',
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT,
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE,
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
