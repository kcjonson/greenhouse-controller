import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const renderUsers = (usersData = []) => {
  if (usersData.length > 0) {
    return usersData.map(userData => {
      return (<div key={userData.id}>
        <Link to={`/users/${userData.id}`}>{userData.firstname} {userData.lastname}</Link>
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
    fetch(`/api/users`)
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
      <Link to={`/users/new`}>Create New</Link>
    </div>);
  }
};