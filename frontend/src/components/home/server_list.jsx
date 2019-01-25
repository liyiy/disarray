import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchServer, deleteServer } from '../../actions/server_actions';
import { openModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
  return {
    servers: Object.values(ownProps.servers)
  };
};

const mdp = dispatch => {
  return {
    fetchServer: serverId => dispatch(fetchServer(serverId)),
    openModal: modal => dispatch(openModal(modal)),
    deleteServer: serverId => dispatch(deleteServer(serverId))
  };
};
class ServerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {servers: this.props.servers};
    // this.deleteServer = this.deleteServer.bind(this);
  }

  // deleteServer(e) {
  //   e.preventDefault();
  //   this.props.deleteServer();
  // }

  render(){
    let list;
    if (this.props.servers) {
      list = this.props.servers.map((server, idx) => {
        return (<li key={idx} className="server-name">{server.name}<button onClick={this.deleteServer}></button></li>)
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
      </div>
    )
  }
}

export default withRouter(connect(msp, mdp)(ServerList));