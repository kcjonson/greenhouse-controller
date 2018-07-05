const session = require.requireActual('../session');
const expressSession = require('express-session');

// middleware function to check for logged-in users
session.sessionChecker = function(req, res, next) {
    console.log('session.js/__mocks_/sessionChecker');
    next();   
};

session.setupSession = function(app) {
    app.use(expressSession({
        secret: 'ssshhhhh',
        saveUninitialized: true,
        resave: false,
        name: "session",
      }));
}


module.exports = session;