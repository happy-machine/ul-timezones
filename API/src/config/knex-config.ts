import dotenv from 'dotenv';
import * as constants from '../constants';
dotenv.config();

export const knex_test = require('knex')({
  client: 'mysql',
  connection: {
    host: constants.MYSQL_SERVER,
    database: constants.MYSQL_TEST_DATABASE,
    user: constants.MYSQL_USERNAME,
    password: constants.MYSQL_PASSWORD,
  },
  seeds: {
    directory: './CLI/seeds/test',
  },
});

export const knex_dev = require('knex')({
  client: 'mysql',
  connection: {
    host: constants.MYSQL_SERVER,
    database: constants.MYSQL_DATABASE,
    user: constants.MYSQL_USERNAME,
    password: constants.MYSQL_PASSWORD,
  },
  seeds: {
    directory: '../CLI/seeds/dev',
  },
});
