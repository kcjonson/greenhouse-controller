import { useState } from 'react';
import EventEmitter from 'events';

class Navigator extends EventEmitter {
	_route;

	constructor() {
		super();
		this._route = window.location.pathname;
	}

	get route() {
		return this._route;
	}

	navigate(route) {
		this._route = route;
		this.emit('navigate', route)
	}
}
const navigator = new Navigator();

// Can be attached to onClick events or called
export const navigate = (eventOrRoute) => {
	let route;
	if (typeof eventOrRoute === 'string') { 
		console.log('TODO: String Route')
	} else if (eventOrRoute.constructor.name === 'SyntheticBaseEvent') {
		eventOrRoute.preventDefault();
		const attrs = eventOrRoute.target.attributes;
		route = attrs.href?.nodeValue || null;
	} else {
		console.error('Unrecognized param type on navigate event')
	}
	if (route) {
		navigator.navigate(route);
	}
}

export const useNavigation = () => {
	const [ route, setRoute ] = useState(navigator.route);
	navigator.on('navigate', (newRoute) => {
		setRoute(newRoute);
	})
	return route;
}
