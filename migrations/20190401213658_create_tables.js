exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', t => {
      t.increments('id').primary()
      t.string('email')
      t.bigInteger('created_at')
      t.bigInteger('updated_at')
    }),
    knex.schema.createTable('passport', t => {
      t.increments('id').primary()
      t.integer('user').unsigned().references('user.id').onDelete('CASCADE').onUpdate('CASCADE')
      t.string('provider')
      t.string('identifier')
      t.string('access_token')
      t.string('refresh_token')
      t.bigInteger('created_at')
      t.bigInteger('updated_at')
    }),
    knex.schema.createTable('refresh_tokens', t => {
      t.increments('id').primary()
      t.integer('user').unsigned().references('user.id').onDelete('CASCADE').onUpdate('CASCADE')
      t.string('token')
      t.bigInteger('expires_at')
      t.bigInteger('created_at')
      t.bigInteger('updated_at')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('passport'),
    knex.schema.dropTable('user'),
    knex.schema.dropTable('refresh_tokens')
  ])
}
