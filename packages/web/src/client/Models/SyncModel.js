import Model from './Model';
import { compile } from 'path-to-regexp';

export default class SyncModel extends Model {

	constructor(initialData) {
		console.log('Hello from SyncModel');
		super(initialData);

		const url = this.__proto__.constructor.url;
		if (!url) {
			throw new Error('SyncModels must be constructed with a static url');
		}

		const getUrl = compile(url)(initialData);
		this.$meta.working = true;
		fetch(getUrl , {
			credentials: 'same-origin',     
		}).then(response => response.json())
			.catch(error => console.error('Error:', error))
			.then(data => {
				console.log('data', data);
				this.$meta.working = false;
				this.set(data);
			});
	}
}