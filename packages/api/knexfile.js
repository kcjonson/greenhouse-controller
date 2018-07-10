module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://greenhouse@localhost/greenhouse',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://greenhouse@postgres/greenhouse',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://greenhouse@postgres/greenhouse',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
};
