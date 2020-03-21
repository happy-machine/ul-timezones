exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('timezones', function(table) {
      table.increments('id').primary();
      table.string('name', 200);
      table.integer('old_id'), table.integer('hours');
      table.integer('minutes');
      table.integer('seconds');
    }),
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('login', 50);
      table.string('key', 255);
    }),
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('timezones'),
    knex.schema.dropTableIfExists('users'),
  ]);
};
