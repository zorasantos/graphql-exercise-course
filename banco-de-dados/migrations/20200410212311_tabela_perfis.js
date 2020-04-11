
exports.up = function(knex) {
  return knex.schema.createTable('perfis', table => {
    table.increments('id').primary()
    table.string('name').notNull().unique()
    table.string('rotulo').notNull()
  }).then(function () {
      return knex('perfis').insert([
          {name: 'comum', rotulo: 'comum'},
          {name: 'admim', rotulo: 'admim'},
          {name: 'master', rotulo: 'master'}
      ])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('perfis')
};
