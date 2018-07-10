import express from 'express';
import { errors } from 'express-simple-errors';
import bcrypt from 'bcryptjs';
import transformResponse from '../users/model';
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
    console.log('setting user on session', user)
    req.session.user = user;
    req.session.authorized = true;

    console.log(req.session)
    res.json(transformResponse(user));
  });

  router.route('/logout').post(async (req, res) => {
    console.log('logging out')
    req.session.authorized = false;
    res.send("logout success!");
  });

  return router;
}
