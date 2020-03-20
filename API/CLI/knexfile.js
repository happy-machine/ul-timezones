require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_SERVER,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
    },
    seeds: {
      directory: './seeds/dev',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  test: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_SERVER,
      database: process.env.MYSQL_TEST_DATABASE,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
    },
    seeds: {
      directory: './seeds/test',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
