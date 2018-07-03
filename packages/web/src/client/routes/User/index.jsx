import React, { Component } from 'react';



export default class User extends Component {

  state = {
    user: {
      username: '',
      firstname: '',
      lastname: '',
      password: ''
    },
    status: this.props.match.params.userId === 'new' ? 'NEW' : 'LOADING', // NEW, LOADING, SAVING, DONE
  }

  componentDidMount() {
    if (this.state.status === 'LOADING') {
      this.get();
    }
  }

  get() {
    fetch(`/api/users/${this.props.match.params.userId}`)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(userData => {
        this.setState({
          user: userData,
          status: 'DONE',
        })
      });
  }

  post() {
    this.setState({
      status: 'SAVING',
    })
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(this.state.user),
      headers: {
        'content-type': 'application/json'
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
      })
      this.props.history.push(`/users/${userData.id}`)
    });
  }

  delete() {
    this.setState({
      status: 'SAVING',
    })
    fetch(`/api/users/${this.state.user.id}`, {
      method: 'DELETE',
      body: JSON.stringify(this.state.user)
    }).catch(error => console.error('Error:', error))
    .then(() => {
      this.setState({
        status: 'DONE',
      })
      this.props.history.push(`/users`)
    });
  }

  onInput = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.status === 'NEW') {
      this.post();
    }
  }

  onDelete = () => {
    if (this.state.user.id) {
      this.delete();
    }
  }

  renderUser() {
    return (<form onSubmit={this.onSubmit}>
      <input type='text' value={this.state.user.username} name='username' autoComplete='off' onChange={this.onInput}/>
      <input type='text' value={this.state.user.firstname} name='firstname' autoComplete='off' onChange={this.onInput} />
      <input type='text' value={this.state.user.lastname} name='lastname' autoComplete='off' onChange={this.onInput} />
      <input type='password' value={this.state.user.password} name='password' autoComplete='off' onChange={this.onInput}/>
      {this.state.status === 'NEW' && <button>Save</button>}
      {this.state.status === 'DONE' && <button onClick={this.onDelete}>delete</button>}
    </form>)
  }

  render() {
    return (<div className="User">
      <h2>User {this.props.match.params.userId}</h2>
      {this.state.status !== 'LOADING' ? this.renderUser() : null}
    </div>);
  }
};