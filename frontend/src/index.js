import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwt_decode from 'jwt-decode';
import * as APIUtil from './util/session_api_util';
import configureStore from './store/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();
  if (localStorage.jwtToken) {
    APIUtil.setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(APIUtil.setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(APIUtil.logoutUser());
      window.location.href = '/login';
    }
  }
  const root = document.getElementById('root');
  ReactDOM.render(<App store={store} />, root);
  serviceWorker.unregister();
});

