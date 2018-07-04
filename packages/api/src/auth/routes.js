/* eslint-disable */

import express from 'express';
import { errors } from 'express-simple-errors';
import bcrypt from 'bcryptjs';
//import transformResponse, { schema } from './model'; // eslint-disable-line no-unused-variables
import db from '../db';
const userTable = 'users';

// https://codeforgeek.com/2015/07/using-redis-to-handle-session-in-node-js/
// https://www.codementor.io/mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3

export default function ()  {
  const router = express.Router();

  router.route('/login').post(async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let user = await db.query(`SELECT * FROM ${userTable} WHERE username = '${username}'`, req.params.id)
      .catch((err) => next(err));
    user =  user && user[0];
    if (!user) {
      return next(new errors.NotFound('This user does not exist'));
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(new Error('Passwords do not match'));
    }
    delete user.password;
    //req.session.user = user;
    res.json(user);
  });


  return router;
}
