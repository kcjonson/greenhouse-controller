import React, { Component } from 'react';


export default class Login extends Component {

  state = {
    error: false,
    user: {
      username: '',
      password: ''
    }
  }

  post() {
    this.setState({
      status: 'SAVING',
    })
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(this.state.user),
      headers: {
        'content-type': 'application/json'
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .catch(error => {
      console.error(error)
      this.setState({
        error: true
      })
    })
    .then(userData => {
      if (userData) {
        this.props.history.push(`/`)
      }
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
    this.post();
  }


  render() {
    return (<div className="Login">
      <h2>Login</h2>
      <form onSubmit={this.onSubmit}>
        <input type='text' value={this.state.user.username} name='username' autoComplete='off' onChange={this.onInput}/>
        <input type='password' value={this.state.user.password} name='password' autoComplete='off' onChange={this.onInput}/>
        <button>Login</button>
      </form>
    </div>);
  }
};