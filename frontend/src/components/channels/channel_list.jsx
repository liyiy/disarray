import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createChannel, deleteChannel } from '../../actions/channel_actions';
import { fetchServer } from '../../actions/server_actions';
import { openModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
  let channels;
  if (ownProps.channels) {
    channels = Object.values(ownProps.channels);
  } else {
    channels = null;
  }
  return {
    channels: channels
  };
};

const mdp = dispatch => {
  return {
    createChannel: (serverId) => dispatch(createChannel(serverId)),
    deleteChannel: (channel) => dispatch(deleteChannel(channel)),
    openModal: modal => dispatch(openModal(modal)),
    fetchServer: serverId => dispatch(fetchServer(serverId))
  };
};


class ChannelList extends React.Component {

  constructor(props) {
    super(props);
    this.deleteChannel = this.deleteChannel.bind(this);
  }

  deleteChannel(e, channel) {
    e.stopPropagation();
    this.props.deleteChannel(channel).then(this.props.fetchServer(channel.server));
  }

  render() {
    let channels;
    if (this.props.channels) {
      channels = this.props.channels.map((channel, idx) => {
        return (
          <li key={idx}
            className="channel-name"
            onClick={() => this.props.history.push(`/servers/${this.props.serverId}/${channel._id}`)}>
            #  {channel.name}
            <div onClick={(e) => this.deleteChannel(e, channel)}>X</div>
          </li>
        )
      })
    }
    return (
      <div className="channels-container">
        <div className="channels-header">
          <div className="text-channels">TEXT CHANNELS</div>
          <div className="new-channel-btn" onClick={() => this.props.openModal('createChannel')}>+</div>
        </div>
        <ul className="channels-list">
          {channels}
        </ul>
      </div>
    );
  }

}

export default withRouter(connect(msp, mdp)(ChannelList));

