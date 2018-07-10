import path from 'path';
import express from 'express';
import {setupSession, sessionChecker} from './session';
import paths from '../../paths';

const app = express();
setupSession(app);
    
const sendIndex = (res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
}

app.get('/login', (req, res) => {
  sendIndex(res);
});

app.get('/logout', (req, res) => {
  if (req.session) {
    console.debug('logging out')
      req.session.authorized = false;
  } else {
    console.warn('unable to logout, no session')
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