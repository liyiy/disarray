import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createChannel, deleteChannel } from '../../actions/channel_actions';
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
    deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
    openModal: modal => dispatch(openModal(modal))
  };
};


class ChannelList extends React.Component {

  constructor(props) {
    super(props);
    // this.deleteChannel = this.deleteChannel.bind(this);
  }


  render() {
    let channels;
    if (this.props.channels) {
      channels = this.props.channels.map((channel, idx) => {
        return (
          <li key={idx}
            className="channel-name"
            onClick={() => this.props.history.push(`/channels/${channel._id}`)}>
            {channel.name}
            <button ></button>
          </li>
        )
      })
    }
    return (
      <div className="channels-container">
        <ul>
          {channels}
        </ul>
        <button onClick={() => this.props.openModal('createChannel')}>new channel</button>
      </div>
    );
  }

}

export default withRouter(connect(msp, mdp)(ChannelList));

