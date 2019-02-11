import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteServer } from '../../actions/server_actions';
import { logoutUser } from '../../util/session_api_util';
import { openModal } from '../../actions/modal_actions';
import ServerListItem from './server_list_item';

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
    this.state = { servers: this.props.servers };
  };

  componentDidUpdate(oldProps) {
    if (oldProps.location.pathname !== this.props.location.pathname) {
      this.props.servers.forEach(server => {
        if (this.props.location.pathname.slice(9) === server._id) {
          this.setState({ [server._id]: "active" })
        } else {
          this.setState({ [server._id]: "inactive"})
        }
        console.log(server);
      });
    };
  };

  render() {
    let list;
    if (this.props.servers) {
      list = this.props.servers.map((server, idx) => {
        return (
          <ServerListItem key={idx} server={server} idx={idx} active={this.state[server._id]}/>
        );
      });
    } else {
      list = null;
    };

    return (
      <div className="servers-container">
        <ul className="servers-list">
          {list}
          <li>
            <button className="new-server-button" onClick={() => this.props.openModal('createServer')}>+</button>
          </li>
        </ul>
        <button onClick={this.props.logoutUser}>Logout</button>
      </div>
    );
  };
};

export default withRouter(connect(msp, mdp)(ServerList));