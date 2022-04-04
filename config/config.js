const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	db: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 5432,
		user: process.env.DB_USER || 'admin',
		password: process.env.DB_PASSWORD || '1234',
		database: process.env.DB_DATABASE || 'store'
	}
};

module.exports = { config };