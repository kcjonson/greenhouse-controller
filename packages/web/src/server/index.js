import path from 'path';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { createClient as createRedisClient } from 'redis';
import connectRedis from 'connect-redis';
import paths from '../../paths';


const app = express();
app.use(cookieParser());

// Set up session
var redisHost = process.env.REDIS_HOST || '127.0.0.1';
var redisPort = process.env.REDIS_PORT || 6379;
const redisClient = createRedisClient(redisPort, redisHost);
const sessionStore = connectRedis(session);
app.use(session({
  key: 'user_sid',
  secret: 'ssshhhhh',
  saveUninitialized: false,
  resave: false,
  cookie: {
    expires: 600000
  },
  store: new sessionStore({
    client: redisClient,
    ttl :  260,
    logErrors: process.env.NODE_ENV === 'production' ? true : false
  }),
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');
  }
  next();
});


// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  console.log('req.session', req.session);
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.redirect('/login');
  }    
};

const sendIndex = (res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
}


app.get('/login', (req, res) => {
  sendIndex(res);
});

app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
  } 
  res.redirect('/login');
});

app.use(paths.publicPath, express.static(path.join(__dirname, '../client')))
app.get('/*', sessionChecker, function (req, res) {
  sendIndex(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is running on port ${port}`);
});