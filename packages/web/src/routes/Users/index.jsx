import React, { Component } from 'react';

const renderUsers = (usersData = []) => {
  if (usersData.length > 0) {
    return usersData.map(userData => {
      return (<div key={userData.id}>
        <a href={`/users/${userData.id}`}>{userData.firstname} {userData.lastname}</a>
      </div>)
    })
  } else {
    return <div>No users found</div>
  }
}

export default class Users extends Component {
  
  state = {
    users: [],
    loading: true,
  }

  componentDidMount() {
    fetch(`http://localhost:8090/api/users`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(usersData => {
        this.setState({
          users: usersData,
          loading: false,
        })
      });
  }

  render() {
    return (<div className="Users">
      <h2>Users</h2>
      {this.state.loading ? null : renderUsers(this.state.users)}
      <a href={`/users/new`}>Create New</a>
    </div>);
  }
};