import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteServer } from '../../actions/server_actions';

const msp = (state, ownProps) => {
  return {

  }
}

const mdp = dispatch => {
  return {
    deleteServer: serverId => dispatch(deleteServer(serverId))
  }
}

class ServerListItem extends React.Component {
  constructor(props) {
    super(props);
    this.showServerName = this.showServerName.bind(this);
    this.deleteServer = this.deleteServer.bind(this);
  }

  showServerName() {
    // this.serverName.hidden = false;
  }

  deleteServer(e, serverId) {
    e.stopPropagation();
    this.props.deleteServer(serverId);
  }

  render() {
    const { idx, server } = this.props;

    return (
      <>
        <li key={idx}
          ref={elem => this.serverName = elem}
          className="server-name"
          onClick={() => this.props.history.push(`/servers/${server._id}`)}
          onMouseOver={this.showServerName(server)}>
          {server.name[0]}
        </li>
        <div className="server-name-hidden">{server.name}</div>
        <button className="server-delete" onClick={(e) => this.deleteServer(e, server._id)}>Delete server</button>
      </>
    )
  }
}

export default withRouter(connect(msp, mdp)(ServerListItem));