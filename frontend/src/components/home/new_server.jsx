import React from 'react';
import { createServer } from '../../actions/server_actions';
import { connect } from 'react-redux';

const mdp = dispatch => {
  return {
    createServer: serverData => dispatch(createServer(serverData)),
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
    )
  }
}

export default connect(null, mdp)(NewServer);