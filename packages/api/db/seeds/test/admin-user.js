var bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          username: 'admin',
          email: 'admin@localhost',
          password: bcrypt.hashSync('password', 10)
        },
      ]);
    });
};
