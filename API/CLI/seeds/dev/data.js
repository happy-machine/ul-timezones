const { parseXML } = require('../../../dist/service/xml-service');
const { XML } = require('../../data/xml');

const transformedXML = parseXML(XML).map(row => {
  return {
    name: row.Name,
    hours: row.Hours,
    minutes: row.Mins,
    seconds: row.Secs,
    old_id: row.Id,
  };
});

exports.seed = function(knex, Promise) {
  //   return knex('timezones')
  //     .del()
  //     .then(() => knex('users').del())
  //     .then(() => {
  //       return knex('timezones').insert(transformedXML);
  //     })
  //     .then(() => {
  //       return knex('users').insert({
  //         login: 'root',
  //         key: '28ca1709b0b27fc11b923240b6957ae13f865bcf',
  //       });
  //     });
  return knex('timezones')
    .insert(transformedXML)
    .then(() => {
      return knex('users').insert({
        login: 'root',
        key: '28ca1709b0b27fc11b923240b6957ae13f865bcf',
      });
    });
};
