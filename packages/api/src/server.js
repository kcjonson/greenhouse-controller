import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {setupSession} from './session';
import usersRoutes from './users/routes';
import authRoutes from './auth/routes';

const app = express();
setupSession(app);

// app middleware
app.use(cors());
app.use(bodyParser.json({type: 'application/json'}));

// Disable etag
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
app.disable('etag');

app.use('/', authRoutes());
app.use('/users', usersRoutes());


export default app;
