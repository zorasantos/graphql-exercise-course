
exports.up = function(knex, Promise) {
  return knex.schema.createTable('perfis', table => {
      table.increments('id').primary()
      table.string('name').notNull().unique()
      table.string('tag').notNull()
  }).then(function () {
      return knex('perfis').insert([
          { name: 'comum', tag: 'Comum' },
          { name: 'admin', tag: 'Administrador' },
      ])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('perfis')
};
