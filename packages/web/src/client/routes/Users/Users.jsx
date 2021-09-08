import React, { useEffect, useState } from 'react';
import Header from '../../shared/Header';

import { navigate } from '../../util/nav';


const renderUsers = (usersData = []) => {
	if (usersData.length > 0) {
		return usersData.map(userData => {
			if (userData.id && userData.username) {
				let label;
				if (userData.firstName) {
					label = `${userData.firstname} ${userData.lastname}`;
				} else {
					label = userData.username;
				}
				return (<div key={userData.id}>
					<a href={`/admin/users/${userData.id}`} onClick={navigate}>{label}</a>
				</div>);
			}
		});
	} else {
		return <div>No users found</div>;
	}
};

export default function Users() {

	const [ state, setState ] = useState({
		users: null,
		loading: true,
	});

	useEffect(() => {
		fetch('/api/users', {
			credentials: 'same-origin',
		}).then(response => response.json())
			.catch(error => console.error('Error:', error))
			.then(usersData => {
				setState({
					users: usersData,
					loading: false,
				});

			});
	}, []);

	return (<div className='Users'>
		<Header />
		<h2>Users</h2>
		{state.loading ? null : renderUsers(state.users)}
		<a href={'/admin/users/new'} onClick={navigate}>Create New</a>
	</div>);

};