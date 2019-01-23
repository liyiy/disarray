import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../util/session_api_util';
import ServerList from './server_list';

const msp = (state, ownProps) => {
  return {

  }
}

const mdp = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logoutUser()
  }

  render() {
    return (
      <>
        <ServerList />
        <button onClick={this.logout}>Logout</button>
        <h1>Hi this is the home page</h1>
      </>
    )
  }
}

export default connect(msp, mdp)(Home);