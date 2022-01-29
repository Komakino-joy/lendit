const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = () => {
  if(process.env.DEVELOPMENT) {
    return {
      connectionString: process.env.DATABASE_URL,
    }

  } else {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: { 
        rejectUnauthorized: false 
      }
    }
  }

}

const db = knex({
  client: 'pg',
  connection: connectionString(),
  useNullAsDefault: true
})

module.exports = db;