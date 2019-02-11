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
    this.hideServerName = this.hideServerName.bind(this);
    this.deleteServer = this.deleteServer.bind(this);
    this.handleServerClick = this.handleServerClick.bind(this);
  }

  showServerName() {
    this.serverName.hidden = false;
  };

  handleServerClick() {
    this.serverIcon.className = "server-icon-active";
    this.props.history.push(`/servers/${this.props.server._id}`);
  };

  hideServerName() {
    this.serverName.hidden = true;
  };

  deleteServer(e, serverId) {
    e.stopPropagation();
    this.props.deleteServer(serverId);
  };

  render() {
    const { idx, server, active } = this.props;

    return (
      <li key={idx} className="server-name-container">
        <div
            className={active === "active" ? "server-icon-active" : "server-icon"}
            ref={elem => this.serverIcon = elem}
            onClick={this.handleServerClick}
            onPointerOver={this.showServerName}
            onPointerLeave={this.hideServerName}>
            {server.name[0]}
        </div>
        <div className="server-name-hover"
          ref={elem => this.serverName = elem}
          hidden>
          <span className="server-name">{server.name}</span>
        </div>
        <button className="server-delete" onClick={(e) => this.deleteServer(e, server._id)}>Delete server</button>
      </li>
    );
  };
};

export default withRouter(connect(msp, mdp)(ServerListItem));