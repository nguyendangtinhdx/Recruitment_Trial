// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:     'localhost',
      database: 'recruitment',
      user:     'root',
      password: 'abc123',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations',
    }
},

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
