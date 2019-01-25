import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createServer, fetchServers, fetchServer } from '../../actions/server_actions';
import NewServer from './new_server';

const msp = (state, ownProps) => {
  return {
    servers: Object.values(ownProps.servers)
  };
};

const mdp = dispatch => {
  return {
    fetchServer: serverId => dispatch(fetchServer(serverId))
  };
};
class ServerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {servers: this.props.servers};
  }

  render(){
    let list;
    if (this.props.servers) {
      list = this.props.servers.map((server, idx) => {
        return (<li key={idx} className="server-name">{server.name}</li>)
      })
    } else {
      list = null;
    }
    return (
      <div className="servers-container">
        <ul>
          {list}
          <li><NewServer/></li>
        </ul>
      </div>
    )
  }
}

export default withRouter(connect(msp, mdp)(ServerList));