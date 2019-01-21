import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './util/route_util.js';
import LogInFormContainer from './components/session/login_form_container';
import SignUpFormContainer from './components/session/signup_form_container';
import HomePage from './components/home/home_page';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <AuthRoute exact path='/login' component={LogInFormContainer}/>
        <AuthRoute exact path='/signup' component={SignUpFormContainer}/>
        <ProtectedRoute exact path='/' component={HomePage}/>
        <header className="App-header">
          <p>
            WELCOME TO DISCORD
          </p>
        </header>
      </div>
    );
  }
}

export default App;
