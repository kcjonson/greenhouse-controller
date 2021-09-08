import { match } from 'path-to-regexp';

import Home from './Home';
import Login from './Login';
import Admin from './Admin';
import Users from './Users';
import User from './User';

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/admin',
		component: Admin,
	},
	{
		path: '/admin/users',
		component: Users,
	},
	{
		path: '/admin/users/:userId',
		component: User,
	},
];

export const getRoute = (searchRoute) => {
	let foundRoute;
	// Note: deliberately taking last match.
	routes.forEach(route => {
		const matchInfo = match(route.path)(searchRoute);
		if (matchInfo) {
			foundRoute = {
				...route,
				params: matchInfo.params,
			};
		}
	});
	return foundRoute;
};

export default routes;