import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Home from './routes/Home';
import Users from './routes/Users';
import User from './routes/User';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/users" exact component={Users} />
      <Route path="/users/:userId" component={User} />
    </div>
  </Router>
);

export default App;