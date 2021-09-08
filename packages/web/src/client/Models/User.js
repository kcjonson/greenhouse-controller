import SyncModel from './SyncModel';
class User extends SyncModel {

	static url = '/api/users/:id';

	static properties = new Set([
		'id',
		'username',
		'email',
		'firstname',
		'lastname',
	]);
}

export default User;