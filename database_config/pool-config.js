const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL || 'postgresql://postgres:123456@localhost:5432/test_store'
});

pool.on('error', (err, client) => {
	console.error('Unexpected error on idle client', err);
	process.exit(-1);
});

console.log('Database Connected');

pool.on('remove', () => {
	console.log('pool => connection returned ----------------------');
});

process.on('SIGINT', () =>
	pool.end((err) => {
		if (err) return console.log(err);
		console.log('pool => closed');
		process.exit(0);
	})
);

module.exports = pool;
