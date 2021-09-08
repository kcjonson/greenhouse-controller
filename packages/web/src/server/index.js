/* eslint-disable no-undef */

import path from 'path';
import express from 'express';
import {setupSession, sessionChecker} from './session';
// import paths from '../../paths';
import renderPage from './renderPage';
import logger from './logger';

const app = express();
setupSession(app);



let staticPath, staticPage;
if (process.env.NODE_ENV != 'development') {
	staticPath = 'app/static/';
	try {
		staticPage = renderPage(staticPath);
	} catch (e) {
		logger.error('Unable to render page:', e);
		process.exit();
	};
} else {
	staticPath = './dist/client/';
}

const sendPage = (req, res) => {
	try {
		if (process.env.NODE_ENV === 'development') {
			res.send(renderPage(staticPath));
		} else {
			res.send(staticPage);
		}
	} catch (e) {
		logger.error('Unable to return page:', e);
		res.send();  // TODO: Error page
	}
};

// Note: No auth
app.get('/login', sendPage);
app.get('/logout', (req, res) => {
	if (req.session) {
		console.debug('logging out');
		req.session.authorized = false;
	} else {
		console.warn('unable to logout, no session');
	}
	res.redirect('/login');
});
app.use('/static', express.static(path.resolve(staticPath)));

// Note: Has Auth
app.get('/*', sessionChecker, sendPage);



const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Your app is running on port ${port}`);
});