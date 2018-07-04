/* eslint-disable */

import express from 'express';
import { errors } from 'express-simple-errors';
import transformResponse, { schema } from './model'; // eslint-disable-line no-unused-variables
import db from '../db';
const userTable = 'users';


export default function ()  {
  const router = express.Router();

  router.route('/login').post((req, res) => {
    console.log('login')
    // const user = await db.getById('users', req.params.id)
    //   .catch((err) => next(err));
    // res.locals.user = user && user[0];
    // if (!res.locals.user) {
    //   return next(new errors.NotFound('This user does not exist'));
    // }
  });


  return router;
}
