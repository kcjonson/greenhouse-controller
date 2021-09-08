import { useState } from 'react';
import EventEmitter from 'events';

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

// Can be attached to onClick events or called
export const navigate = (eventOrRoute) => {
	let route;
	if (typeof eventOrRoute === 'string') { 
		console.log('TODO: String Route');
	} else if (eventOrRoute.constructor.name === 'SyntheticBaseEvent') {
		// TODO: Only block if href is in this domain
		eventOrRoute.preventDefault();
		const attrs = eventOrRoute.target.attributes;
		route = attrs.href?.nodeValue || null;
	} else {
		console.error('Unrecognized param type on navigate event');
	}
	if (route) {
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
