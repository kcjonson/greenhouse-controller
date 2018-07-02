import express from 'express';
import { validate } from 'isvalid';
import { errors } from 'express-simple-errors';
import transformResponse, { schema } from './model'; // eslint-disable-line no-unused-variables
import db from '../db';
const userTable = 'users';

export default function ()  {
  const router = express.Router();

  router.route('/')
    .get(getAllUsers, returnResponse)
    .post(validate.body(schema), createUser, returnResponse)
    .delete(clearUsers, returnResponse);

  router.route('/:id')
    .all(getOneUser)
    .get(returnResponse)
    .patch(patchUser, returnResponse)
    .delete(deleteUser, returnResponse);

  async function getAllUsers(req, res, next) {
    res.locals.users = await db.all(userTable)
      .catch((err) => next(err));
    next();
  }

  async function clearUsers(req, res, next) {
    const rows = await db.clear(userTable)
      .catch((err) => next(err));
    res.locals.users = rows;
    res.status(204);
    next();
  }

  async function createUser(req, res, next) {
    if (req.body.order) {
      req.body.position = req.body.order;
      delete req.body.order;
    }
    const user = await db.create(userTable, req.body)
      .catch((err) => next(err));
    res.locals.user = user[0];
    res.status(201);
    next();
  }

  async function getOneUser(req, res, next) {
    const user = await db.getById('users', req.params.id)
      .catch((err) => next(err));
    res.locals.user = user && user[0];
    if (!res.locals.user) {
      return next(new errors.NotFound('This user does not exist'));
    }
    next();
  }

  async function patchUser(req, res, next) {
    const user = Object.assign({}, res.locals.user[0], req.body);
    if (user.order) {
      user.position = user.order;
      delete user.order;
    }

    const updatedUser = await db.update(userTable, req.params.id, user)
      .catch((err) => next(err));
    res.locals.user = updatedUser[0];
    next();
  }

  async function deleteUser(req, res, next) {
    res.locals.user = await db.deleteById(userTable, req.params.id)
      .catch((err) => next(err));
    res.status(204);
    next();
  }

  function returnResponse(req, res) {
    // handle no responses here
    res.locals.baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json(transformResponse(res.locals));
  }

  return router;
}
