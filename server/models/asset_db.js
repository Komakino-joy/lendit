const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  },
  useNullAsDefault: true
})

module.exports = db;