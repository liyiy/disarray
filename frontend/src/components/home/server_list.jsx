import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteServer } from '../../actions/server_actions';
import { logoutUser } from '../../util/session_api_util';
import { openModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
  return {
    servers: Object.values(ownProps.servers)
  };
};

const mdp = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal)),
    deleteServer: serverId => dispatch(deleteServer(serverId)),
    logoutUser: () => dispatch(logoutUser()),
  };
};
class ServerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {servers: this.props.servers};
    this.deleteServer = this.deleteServer.bind(this);
  }

  deleteServer(e, serverId) {
    e.stopPropagation();
    this.props.deleteServer(serverId).then(this.props.history.push('/servers'));
  }

  render(){

    let list;
    if (this.props.servers) {
      list = this.props.servers.map((server, idx) => {
        return (
        <li key={idx} 
            className="server-name"
            onClick={() => this.props.history.push(`/servers/${server._id}/`)}>
            {server.name}
            <button onClick={(e) => this.deleteServer(e, server._id)}>Delete server</button>
        </li>
        )
      })
    } else {
      list = null;
    }
    return (
      <div className="servers-container">
        <ul>
          {list}
        </ul>
        <button onClick={() => this.props.openModal('createServer')}>new server</button>
        <button onClick={this.props.logoutUser}>Logout</button>
      </div>
    )
  }
}

export default withRouter(connect(msp, mdp)(ServerList));