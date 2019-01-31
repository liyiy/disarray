import React from 'react';
import { createChannel } from '../../actions/channel_actions';
import { fetchServer } from '../../actions/server_actions';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const msp = (state, ownProps) => {
  const sliced = ownProps.location.pathname.slice(9);
  return { 
    server_id: sliced.match(/\w+/)[0] 
  };
};


const mdp = dispatch => {
  return {
    createChannel: channelData => dispatch(createChannel(channelData)),
    fetchServer: serverId => dispatch(fetchServer(serverId)),
    closeModal: () => dispatch(closeModal())
  };
};

class NewChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", server_id: this.props.server_id };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(this.state)
      .then(this.props.closeModal())
      .then(this.props.fetchServer(this.props.server_id));
  }

  render() {
    return (
      <form className="new-channel-container show" onSubmit={this.handleSubmit}>
        <div className="new-channel-top">
          <h1>CREATE YOUR CHANNEL</h1>
          <h3>By creating a new channel, you have access to free text chat to use amongst your friends</h3>
          <div className="new-channel-form">
            <label className="channel-name-label">CHANNEL NAME</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.update("name")}
              className="new-channel-name"
              placeholder="Enter a channel name"
              autoFocus={true}
              required
            />
          </div>
        </div>
        <div className="new-channel-bottom">
          <input className="new-channel-submit" type="submit" value="Create" />
        </div>
      </form>
    )
  }
}

export default withRouter(connect(msp, mdp)(NewChannel));