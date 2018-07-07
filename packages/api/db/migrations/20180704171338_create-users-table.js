exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('CREATE EXTENSION IF NOT EXISTS citext'),
    knex.raw(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY NOT NULL,
      username TEXT NOT NULL UNIQUE,
      email CITEXT NOT NULL UNIQUE,
      firstname TEXT,
      lastname TEXT,
      password VARCHAR NOT NULL
    )`)
  ]);
};
  
exports.down = function(knex) {
  return knex.raw('DROP TABLE IF EXISTS users');
};