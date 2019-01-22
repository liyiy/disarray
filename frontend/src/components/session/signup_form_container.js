import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../util/session_api_util';
import SessionForm from './session_form';

const msp = ({ errors }) => {
  return {
    errors: Object.values(errors),
    formType: 'Register',
    navLink: <Link to="/login"> Already have an account? </Link>,
    message: "Create an account"
  };
};

const mdp = dispatch => {
  return {
    processForm: (user) => dispatch(registerUser(user)),
  };
};

export default connect(msp, mdp)(SessionForm);
