import React from 'react';
import { createServer } from '../../actions/server_actions';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';

const mdp = dispatch => {
  return {
    createServer: serverData => dispatch(createServer(serverData)),
    closeModal: () => dispatch(closeModal())
  };
};

class NewServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createServer(this.state);
  }

  render() {
    return (
      <form className="new-server-container" onSubmit={this.handleSubmit}>
        <div className="new-server-top">
          <h1>CREATE YOUR SERVER</h1>
          <h3>By creating a new server, you have access to free text chat to use amongst your friends</h3>
          <label for="new-server-name">SERVER NAME</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.update("name")}
            className="new-server-name"
            placeholder="Enter a server name"
            autofocus={true}
            required
          />
        </div>
        <div className="new-server-bottom">
          <input className="new-server-submit" type="submit" value="Create" />
        </div>
      </form>
    )
  }
}

export default connect(null, mdp)(NewServer);