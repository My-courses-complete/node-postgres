const { config } = require("../config/config");

const USER = encodeURIComponent(config.db.user);
const PASSWORD = encodeURIComponent(config.db.password);
const URI = `postgres://${USER}:${PASSWORD}@${config.db.host}:${config.db.port}/${config.db.database}`;

module.exports = {
	development: {
		uri: URI,
		dialect: "postgres",
	},
	production: {
		uri: URI,
		dialect: "postgres",
	},
};