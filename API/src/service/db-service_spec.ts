import dotenv from 'dotenv';
import { expect } from 'chai';
import * as db from './db-service';
import { knex_test } from '../config/knex-config';

dotenv.config();

describe('Database functions', () => {
  beforeEach(async () => {
    await knex_test.seed.run();
  });

  describe('Tests should be using test db and seeds', () => {
    it('Should add all XML rows', async () => {
      const results = await db.getTimezones(knex_test);
      expect(results.length).to.equal(40);
    });
    it('Should get a timezone from a search string', async () => {
      const results = await db.searchTimezone('hawaii', knex_test);
      expect(results[0].name).to.equal('United States (Hawaii) UTC-10:00');
    });
    it('Should add a root user', async () => {
      const results = await db.getUsers(knex_test);
      expect(results[0].login).to.equal('root');
    });
    it('Should get a user by login', async () => {
      const results = await db.getUserByLogin('root', knex_test);
      expect(results[0].key).to.equal(
        '28ca1709b0b27fc11b923240b6957ae13f865bcf'
      );
    });
  });
  after(async () => {
    knex_test('timezones')
      .del()
      .then(() => knex_test('users').del());
  });
});

// query.debug();
// console.log('query: ', query.toSQL());
// console.log('query native: ', query.toSQL().toNative());
