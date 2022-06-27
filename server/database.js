const { Pool } = require('pg');

const url = 'postgres://twkezsld:ODdiyibD-s-GJ1AWcIyaQHCrxapv6kzi@heffalump.db.elephantsql.com/twkezsld';

const pool = new Pool({
  connectionString: url
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
