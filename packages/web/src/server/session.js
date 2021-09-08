import session from 'express-session';
import { createClient as createRedisClient } from 'redis';
import connectRedis from 'connect-redis';

// middleware function to check for logged-in users
export function sessionChecker(req, res, next) {
	console.log('session.js/sessionChecker', req.session);
	if (req.session && req.session.authorized === true) {
		next();
	} else {
		res.redirect('/login');
	}    
};

export function setupSession(app) {
	// Set up session
	var redisHost = process.env.REDIS_HOST || '127.0.0.1';
	var redisPort = process.env.REDIS_PORT || 6379;
	const redisClient = createRedisClient(redisPort, redisHost);
	const sessionStore = connectRedis(session);
	app.use(session({
		secret: 'ssshhhhh',
		saveUninitialized: true,
		resave: false,
		name: 'session',
		store: new sessionStore({
			client: redisClient,
			ttl: 3600,
			logErrors: process.env.NODE_ENV === 'production' ? true : false,
		}),
	}));

}
