import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMessages, createMessage } from '../../actions/message_actions';
import io from 'socket.io-client';


const msp = (state, ownProps) => {
  return {
    channel: state.entities.channels[ownProps.match.params.channelId],
    channelId: ownProps.match.params.channelId,
    currentUser: state.session
  };
};

const mdp = dispatch => {
  return {
    fetchMessages: modelId => dispatch(fetchMessages(modelId)),
    createMessage: messageData => dispatch(createMessage(messageData)),
  };
};

class MessagesShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "", chatHistory: [], channelId: this.props.channelId };
    this.sendMessage = this.sendMessage.bind(this);
    this.socket = io("localhost:3000");
    this.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({ chatHistory: [...this.state.chatHistory, data.message]});
      console.log(this.state.chatHistory);
    };
  }
  
  componentDidMount() {
    this.scrollToBottom();
    this.socket.emit("JOIN_CHANNEL", {
      channelId: this.state.channelId
    });
  }

  componentDidUpdate(oldProps) {
    this.scrollToBottom();
    this.socket.emit("LEAVE_CHANNEL", {
      channelId: oldProps.channelId
    });
    this.socket.emit("JOIN_CHANNEL", {
      channelId: this.props.channelId
    });
  };

  sendMessage(ev) {
    ev.preventDefault();
    if (this.state.message !== "") {
    this.socket.emit('SEND_MESSAGE', {
      message: this.state.message
    });
    }
    this.setState({ message: '' });
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  scrollToBottom () {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "auto" });
    } else {
      return null;
    }
  }

  render() {
    let list;
    if (this.state.chatHistory) {
      list = this.state.chatHistory.map((message, idx) => {
        return (
          <li key={idx} className="chat-message">
            <main className="message-sender">
              {this.props.currentUser.username}
            </main>
            {message}
          </li>
        );
      });
    }

    if (this.props.channel) {
      return (
        <div className="messages-container">
          <div className="messages-header">
            #{this.props.channel.name}
          </div>
            {/* {this.props.channel._id} */}
            <div className="messages-box">
              <ul id="chat-history">
                {list}
              </ul>

              {/* {this.state.message.length > 0 ? (
                <span>{this.props.currentUser.username} is typing...</span>
              ) : null} */}
          </div>
          <div className="new-message-box">
            <form onSubmit={this.sendMessage}>
              <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
              
            </form>
          </div>      
          {/* <div
            style={{ float: "left", clear: "both" }}
            ref={el => {this.messagesEnd = el}}
          /> */}
        </div>
      );
    } else {
      return (
        <div>No Text Channels</div>
      );
    }
  }
}

export default withRouter(connect(msp, mdp)(MessagesShow));