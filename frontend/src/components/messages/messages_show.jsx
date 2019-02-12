import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMessages, createMessage } from '../../actions/message_actions';
import io from 'socket.io-client'

const msp = (state, ownProps) => {
  return {
    channel: state.entities.channels[ownProps.match.params.channelId]
  }
}

const mdp = dispatch => {
  return {
    fetchMessages: modelId => dispatch(fetchMessages(modelId)),
    createMessage: messageData => dispatch(createMessage(messageData)),
  }
}

class MessagesShow extends React.Component {
  constructor(props) {
    super(props)
    this.socket = io({transports: ['websocket', 'flashsocket', 'polling']});
  }

  render() {
    if (this.props.channel) {
      return(
        <div className="messages-container">
          {this.props.channel.name}
          <br/>
          {this.props.channel._id}
        </div>
      )
    } else {
      return null;
    }
  }
}

export default withRouter(connect(msp, mdp)(MessagesShow));