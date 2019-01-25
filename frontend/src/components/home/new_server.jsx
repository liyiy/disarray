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
      <div className="new-server-container">
        <h1>CREATE YOUR SERVER</h1>
        <h3>By creating a new server, you have access to free text chat to use amongst your friends</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.update("name")}
            className="server-form-name"
            placeholder="Enter a server name"
            required
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default connect(null, mdp)(NewServer);