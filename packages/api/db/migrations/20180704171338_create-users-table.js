exports.up = function(knex, Promise) {
    let createQuery = `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY NOT NULL,
      username TEXT NOT NULL UNIQUE,
      email CITEXT NOT NULL UNIQUE,
      firstname TEXT,
      lastname TEXT,
      password VARCHAR NOT NULL
    )`
    return knex.raw(createQuery)
  }
  
  exports.down = function(knex, Promise) {
    let dropQuery = `DROP TABLE users`
    return knex.raw(dropQuery)
  }