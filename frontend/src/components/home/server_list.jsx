import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createServer, fetchServers, fetchServer } from '../../actions/server_actions';

const msp = (state, oldProps) => {
  debugger
  return {

  }
}

const mdp = dispatch => {
  return {
    createServer: serverData => dispatch(createServer(serverData)),
    fetchServers: () => dispatch(fetchServers()),
    fetchServer: serverId => dispatch(fetchServer(serverId))
  }
}

class ServerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {servers: []}
  }

  render(){
    return (
      <h1>THIS IS THE SERVER LIST</h1>
    )
  }
}

export default withRouter(connect(msp, mdp)(ServerList));