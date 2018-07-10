import express from 'express';
import { validate } from 'isvalid';
import { sessionChecker } from '../session';
import  { schema, transformResponse, hashPassword } from './model';
import db from '../db';
const userTable = 'users';

export default function() {
  const router = express.Router();

  router.route('/')
    .all(sessionChecker)
    .get(getAllUsers)
    .delete(deleteAllUsers)
    .post(validate.body(schema), createUser)

  router.route('/:id')
    .all(sessionChecker)
    .get(getOneUser)
    .patch(patchUser)
    .delete(deleteUser);

  async function getAllUsers(req, res, next) {
    const users = await db.all(userTable);
    res.status(200)
    res.json(transformResponse(users));
    next();
  }

  async function deleteAllUsers(req, res, next) {
    const rows = await db.clear(userTable)
      .catch((err) => {
        res.status(500)
        res.json({
          error: 'A server error occured, unable to delete user'
        })
      });
    res.status(204);
    res.send()
    next();
  }

  async function createUser(req, res, next) {
    const newUser = req.body;
    newUser.password = hashPassword(req.body.password)
    const user = await db.create(userTable, newUser)
    if (user && user[0]) {
      res.status(201);
      res.send(user[0])
    } else {
      res.status(500);
      res.json({
        error: 'A server error occured, unable to create user'
      });
    }
    next();
  }

  async function getOneUser(req, res, next) {
    const user = await db.getById('users', req.params.id)
    if (user && user[0]) {
      res.status(200);
      res.send(user[0])
    } else {
      res.status(500);
      res.json({
        error: 'A server error occured, unable to get user'
      });
    }
    next();
  }

  async function patchUser(req, res, next) {
    const user = req.body;
    if (user && user.password) {
      user.password = hashPassword(req.body.password)
    }
    await db.update(userTable, req.params.id, user)
      .catch((err) => {
        res.status(500)
        res.json({
          error: 'A server error occured, unable to update user'
        })
      });
    res.status(204);
    res.send();
    next();
  }

  async function deleteUser(req, res, next) {
    await db.deleteById(userTable, req.params.id)
      .catch((err) => {
        res.status(500)
        res.json({
          error: 'A server error occured, unable to delete user'
        })
      });
    res.status(204);
    res.send();
    next();
  }


  return router;
}
