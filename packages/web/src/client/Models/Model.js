
function emit(event) {
	if (this.__listeners[event]) {
		this.__listeners[event].forEach(listener => {
			listener();
		});
	}
}

function get(property) {
	//console.log('model.get (single)', property);
	if (typeof property !== 'string') {
		console.error('Skipping get: Property names must be strings');
	}
	if (this.__proto__.constructor.properties.has(property)) {
		return this.__data[property];
	} else {
		console.warn(`Skipping get: property "${property}" is inavlid on "${this.constructor.name}" model`);
	}
};

function set(property, value, doEmit = true) {
	//console.log('model.set (single)', property, value);
	if (typeof property !== 'string') {
		console.error('Skipping set: Property names must be strings');
	}
	if (this.__proto__.constructor.properties.has(property)) {
		this.__data[property] = value;
		if (doEmit) {
			emit.call(this, 'change');
		}
	} else {
		console.warn(`Skipping set: property "${property}" is inavlid on "${this.constructor.name}" model`);
	}
};



export default class Model {

	constructor(initialData) {
		Object.defineProperty(this, '__data', {
			value: {},
			enumerable: false,
			writable: false,
		});

		Object.defineProperty(this, '__listeners', {
			value: {},
			enumerable: false,
			writable: false,
		});
		// Define getters and setters for each property in the property list
		// Allows accessing attributes as model.property instead of just model.get('property');
		// Allows setting attributes as model.property = value instead of just model.set('property', value)
		const properties = this.__proto__.constructor.properties;
		if (!properties) {
			throw new Error('Models must be constructed with a properties list');
		}
		properties.forEach(property => {
			if (typeof property !== 'string') throw new Error('Property names must be strings. Encountered:', property);
			Object.defineProperty(this, property, {
				enumerable: true, // citical if spread operator will work
				get: get.bind(this, property),
				set: set.bind(this, property),
			});
		});

		// Set initial data
		if (initialData) {
			this.set(initialData);
		}

		// Freeze the class so that properties are immuable outside the created setters
		// Note: I find it interesting that this does not freeze setters. I'm slightly worried thats a bug. -KCJ
		Object.freeze(this);
	}

	on(event, callback) {
		if (!this.__listeners[event]) {
			this.__listeners[event] = [];
		}
		// TODO: use soft references here? How do these get garbage collected?
		this.__listeners[event].push(callback);
	}

	// Bulk setter, will handle single values as well;
	set(newData, newValue) {
		//console.log('model.set');
		if (typeof newData === 'object') {
			Object.keys(newData).forEach(property => {
				set.call(this, property, newData[property], false);
			});
			emit.call(this, 'change');
		} else if (typeof newData === 'string') {
			set.call(this, newData, newValue);
			emit.call(this, 'change');
		} else {
			console.warn(`Unable to set properties of type: ${typeof newData} on Model`);
		}
	}

}