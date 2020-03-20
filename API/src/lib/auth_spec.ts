import dotenv from 'dotenv';
import { expect, should, assert } from 'chai';
import * as db from '../service/db-service';
import { knex_test } from '../config/knex-config';
import { userLogin, userVerify } from './auth';

dotenv.config();

describe('Auth', () => {
  beforeEach(async () => {
    await knex_test.seed.run();
  });

  describe('Should be able to login', () => {
    it('Should get a user by login and decode key', async () => {
      const results = await userLogin(
        { login: 'root', password: 'some_hash' },
        knex_test
      );
      expect(results?.login).to.equal('root');
    });

    it('Should not let a user login with the wrong password', async () => {
      const results = await userLogin(
        { login: 'root', password: 'some_hash2' },
        knex_test
      );
      expect(results).to.equal(false);
    });

    it('Should be able to verify a user exists', async () => {
      const testUser = await db.getUserByLogin('root', knex_test);
      const results = await userVerify({ id: testUser[0].id }, knex_test);
      expect(results).to.not.equal({});
    });

    it("Should be able to verify a user doesn't exist", async () => {
      const resultsWrongUser = await userVerify({ id: 1937982873 }, knex_test);
      expect(resultsWrongUser).to.be.deep.equal({});
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
// console.log('query2: ', query.toSQL().toNative());
