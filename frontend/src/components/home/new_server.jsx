import React from 'react';
import { createServer, joinServer } from '../../actions/server_actions';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';

const mdp = dispatch => {
  return {
    createServer: serverData => dispatch(createServer(serverData)),
    joinServer: serverData => dispatch(joinServer(serverData)),
    
    closeModal: () => dispatch(closeModal())
  };
};

class NewServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", serverId: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }                                             

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createServer(this.state)
      .then(this.props.closeModal());
  }

  handleJoin(e) {
    e.preventDefault();
    this.props.joinServer(this.state)
      .then(this.props.closeModal());
  }

  render() {
    return (
      <>
        <form className="new-server-container show" onSubmit={this.handleSubmit}>
          <div className="new-server-top">
            <h1>CREATE YOUR SERVER</h1>
            <h3>By creating a new server, you have access to free text chat to use amongst your friends</h3>
            <div className="new-server-form">
              <label className="server-name-label">SERVER NAME</label>
              <input
                type="text"
                value={this.state.name}
                onChange={this.update("name")}
                className="new-server-name"
                placeholder="Enter a server name"
                autoFocus={true}
              />
            </div>
          </div>
          <div className="new-server-bottom">
            <input className="new-server-submit" type="submit" value="Create" />
          </div>
        </form>

        <form onSubmit={this.handleJoin}>
          <div className="new-server-middle">
            <h1>JOIN A SERVER</h1>
            <div className="new-server-form">
              <label className="server-name-label">SERVER ID</label>
              <input
                type="text"
                value={this.state.serverId}
                onChange={this.update("serverId")}
                className="join-server-id"
                placeholder="Enter a server id"
              />
            </div>
          </div>
          <input className="join-server-submit" type="submit" value="Join" />
        </form>
      </>
    )
  }
}

export default connect(null, mdp)(NewServer);