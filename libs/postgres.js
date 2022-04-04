const { Client } = require('pg');

const { config } = require('../config/config');

const USER = encodeURIComponent(config.db.user);
const PASSWORD = encodeURIComponent(config.db.password);
const URI = `postgres://${USER}:${PASSWORD}@${config.db.host}:${config.db.port}/${config.db.database}`;

async function getConnection() {
  const client = new Client({
    connectionString: URI,
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
