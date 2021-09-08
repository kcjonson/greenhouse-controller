import React from 'react';
import Header from '../../shared/Header';
import { useData } from '../../util/data';

export default function User({ routeParams }) {

	const [ user ] = useData([
		{ model: 'User', params: { id: routeParams.userId }},
	], [ routeParams ]);

	console.log('user', user);

	// state = {
	// 	user: {
	// 		username: '',
	// 		firstname: '',
	// 		lastname: '',
	// 		password: '',
	// 	},
	// 	status: this.props.routeParams.userId === 'new' ? 'NEW' : 'LOADING', // NEW, LOADING, SAVING, DONE
	// }

	// componentDidMount() {
	// 	if (this.state.status === 'LOADING') {
	// 		this.get();
	// 	}
	// }

	function get() {
		fetch(`/api/users/${this.props.routeParams.userId}`, {
			credentials: 'same-origin',     
		}).then(response => response.json())
			.catch(error => console.error('Error:', error))
			.then(userData => {
				this.setState({
					user: userData,
					status: 'DONE',
				});
			});
	}

	function post() {
		this.setState({
			status: 'SAVING',
		});
		fetch('/api/users', {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify(this.state.user),
			headers: {
				'content-type': 'application/json',
			},
		}).then(response => response.json())
			.catch(error => console.error('Error:', error))
			.then(userData => {
				this.setState({
					user: {
						...this.state.user,
						...userData,
					},
					status: 'DONE',
				});
				this.props.history.push(`/users/${userData.id}`);
			});
	}

	// function delete() {
	// 	this.setState({
	// 		status: 'SAVING',
	// 	});
	// 	fetch(`/api/users/${this.state.user.id}`, {
	// 		credentials: 'same-origin',
	// 		method: 'DELETE',
	// 		body: JSON.stringify(this.state.user),
	// 	}).catch(error => console.error('Error:', error))
	// 		.then(() => {
	// 			this.setState({
	// 				status: 'DONE',
	// 			});
	// 			this.props.history.push('/users');
	// 		});
	// }

	// const onInput = (e) => {
	// 	this.setState({
	// 		user: {
	// 			...this.state.user,
	// 			[e.target.name]: e.target.value,
	// 		},
	// 	});
	// }

	// const onSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (this.state.status === 'NEW') {
	// 		this.post();
	// 	}
	// }

	// const onDelete = () => {
	// 	if (this.state.user.id) {
	// 		this.delete();
	// 	}
	// }


	function renderUser() {
		return (<form onSubmit={this.onSubmit}>
			<input type='text' value={this.state.user.username} name='username' autoComplete='off' onChange={this.onInput}/>
			<input type='text' value={this.state.user.firstname} name='firstname' autoComplete='off' onChange={this.onInput} />
			<input type='text' value={this.state.user.lastname} name='lastname' autoComplete='off' onChange={this.onInput} />
			<input type='password' value={this.state.user.password} name='password' autoComplete='off' onChange={this.onInput}/>
			{this.state.status === 'NEW' && <button>Save</button>}
			{this.state.status === 'DONE' && <button onClick={this.onDelete}>delete</button>}
		</form>);
	}


	return (<div className='User'>
		<Header />
		<h2>User {routeParams.userId}</h2>
		{/* {this.state.status !== 'LOADING' ? renderUser() : null} */}
	</div>);

};