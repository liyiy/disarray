import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../util/session_api_util';
import { fetchServers } from '../../actions/server_actions';
import ServerList from './server_list';

const msp = (state, ownProps) => {
  return {
    servers: state.entities.servers
  };
};

const mdp = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    fetchServers: () => dispatch(fetchServers())
  };
};


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.fetchServers();
  }

  logout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <>
        <ServerList servers={this.props.servers}/>
        <button onClick={this.logout}>Logout</button>
        <h1>Hi this is the home page</h1>
      </>
    )
  }
}

export default connect(msp, mdp)(Home);