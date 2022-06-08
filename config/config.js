require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	db: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 5432,
		user: process.env.DB_USER || 'admin',
		password: process.env.DB_PASSWORD || '1234',
		database: process.env.DB_DATABASE || 'store'
	},
	apiKey: process.env.API_KEY || '1234',
	jwtSecret: process.env.JWT_SECRET || '1234',
};

module.exports = { config };