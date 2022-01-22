const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
    useNullAsDefault: true
  });

  module.exports = db;