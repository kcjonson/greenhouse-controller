import Model from './Model';

export default class User extends Model {
	static properties = new Set([
		'id',
		'username',
		'email',
		'firstname',
		'lastname',
	]);
}
