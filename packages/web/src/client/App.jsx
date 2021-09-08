import React from 'react';
import './App.less';
import Home from './routes/Home';
import Login from './routes/Login';
import Users from './routes/Users';
import User from './routes/User';

import { match } from 'path-to-regexp';

import { useNavigation } from './util/nav';


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
		path: '/users',
		component: Users,
	},
	{
		path: '/users/:userId',
		component: User,
	},
];


const getRoute = (searchRoute) => {
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

const App = () => {
	const route = useNavigation();
	const routeConfig = getRoute(route);


	let routeComponent;
	if (routeConfig) {
		routeComponent = <routeConfig.component routeParams={routeConfig.params} />;
	} else {
		routeComponent = (<div>Not Found</div>);
	}

	return <div>
		{routeComponent}
	</div>;

};

export default App;