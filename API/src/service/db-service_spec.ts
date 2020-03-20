import dotenv from 'dotenv';
import { expect, should, assert } from 'chai';
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

  //   describe('addDataToDb', () => {
  //     it('should add rows with appropriate fields', async () => {
  //       const results = await db.addDataToDb(
  //         {
  //           text: 'test text',
  //           text_source: 'tdd',
  //           language: 'English',
  //           metadata_id: 1,
  //         },
  //         knex_test
  //       );
  //       expect(results[0]).to.be.a('number');
  //     });

  //     it('should add rows with appropriate fields and label', async () => {
  //       const result = await db.addDataToDb(
  //         {
  //           text: 'test text2',
  //           text_source: 'tdd',
  //           language: 'English',
  //           metadata_id: 1,
  //         },
  //         knex_test
  //       );
  //       const data_id = result[0];
  //       const label_id = await db.addLabelToData(
  //         {
  //           data_id,
  //           label: 2,
  //           strategy_id: 1,
  //           marker_name: 'Test Marker',
  //         },
  //         knex_test
  //       );
  //       const attached_label = await db.getModel(LABEL, label_id, knex_test);
  //       expect(attached_label[0].data_id).to.equal(data_id);
  //     });
  //   });
  after(async () => {
    knex_test('timezones')
      .del()
      .then(() => knex_test('users').del());
  });
});

// query.debug();
// console.log('query: ', query.toSQL());
// console.log('query2: ', query.toSQL().toNative());
