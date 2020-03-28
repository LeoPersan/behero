
exports.up = function(knex) {
  return knex.schema.createTable('incidents',function (table) {
    table.increments();
    table.string('ong_id').notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.foreign('ong_id').references('id').on('ongs').onUpdate('cascade').onDelete('cascade');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
