import bcrypt from 'bcryptjs';

export const schema = {
  username: {
    type: String,
    required: true,
    errors: {
      type: 'Username name must be a string.',
      required: 'Username name is required.'
    }
  },
  firstname: {
    type: String,
    required: true,
    errors: {
      type: 'First name must be a string.',
      required: 'First name is required.'
    }
  },
  lastname: {
    type: String,
    required: true,
    errors: {
      type: 'Last name must be a string.',
      required: 'Last name is required.'
    }
  },
  password: {
    type: String,
    required: true,
    errors: {
      type: 'Password name must be a string.',
      required: 'Password is required.'
    }
  },
};

function cleanUpUserObject(user) {
  if (user.hasOwnProperty('password')) {
    delete user.password;
  }
  for (var [key, value] of Object.entries(user)) {
    if (value === null || value === undefined) delete user[key];
  }
  return user;
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
} 

export function transformResponse(result) {
  if (result.users) {
    result = result.users.map((obj) => cleanUpUserObject(obj));
  }
  if (result.user) {
    result = cleanUpUserObject(result.user);
  }
  return result;
}
