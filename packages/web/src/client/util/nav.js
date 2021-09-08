import { useState } from 'react';
import EventEmitter from 'events';
import { getRoute } from '../routes';

class Navigator extends EventEmitter {
	_route;

	constructor() {
		super();
		this._route = window.location.pathname;
		window.addEventListener('popstate', this.onPopState.bind(this));
	}

	get route() {
		return this._route;
	}

	navigate(route) {
		this._route = route;
		this.emit('navigate', this._route);
	}

	onPopState() {
		this._route = window.location.pathname;
		this.emit('navigate', this._route);
	}
}
const navigator = new Navigator();

// Can be attached to onClick events or called directly with a route string
export const navigate = (eventOrRoute) => {
	let route, shouldRoute = false;
	if (typeof eventOrRoute === 'string') { 
		route = eventOrRoute;
		if (getRoute(route)) {
			shouldRoute = true;
		}
	} else if (eventOrRoute.constructor.name === 'SyntheticBaseEvent') {
		const attrs = eventOrRoute.target.attributes;
		route = attrs.href?.nodeValue || null;
		if (getRoute(route)) {
			shouldRoute = true;
			eventOrRoute.preventDefault();
		}
	} else {
		console.error('Unrecognized param type on navigate event');
	}
	if (route && shouldRoute) {
		history.pushState({}, null, route);
		navigator.navigate(route);
	}
};

export const useNavigation = () => {
	const [ route, setRoute ] = useState(navigator.route);
	navigator.on('navigate', (newRoute) => {
		setRoute(newRoute);
	});
	return route;
};
