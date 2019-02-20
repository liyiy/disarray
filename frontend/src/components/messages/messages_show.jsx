import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMessages, createMessage } from '../../actions/message_actions';
import io from 'socket.io-client';
import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3000');

const msp = (state, ownProps) => {
  return {
    channel: state.entities.channels[ownProps.match.params.channelId],
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
    this.state = { message: "", chatHistory: [] };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.sendSocketIO = this.sendSocketIO.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.socket = io("localhost:3000");
    this.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: data });
      console.log(this.state.messages);
    };
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  sendMessage(ev) {
    ev.preventDefault();
    this.socket.emit('SEND_MESSAGE', {
      message: this.state.message
    });
    this.setState({ message: '' });
  }

  // addMessage()

//   this.sendMessage = ev => {
//   ev.preventDefault();
//   this.socket.emit('SEND_MESSAGE', {
//     author: this.state.username,
//     message: this.state.message
//   });
//   this.setState({ message: '' });
// }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   if (this.state.message === "") {
  //     return null;
  //   } else {
  //     this.socket.emit("chat message", this.state.message);
  //     const history = this.state.chatHistory.concat(this.state.message);
  //     this.socket.on("chat message", message => {
  //       this.setState({ chatHistory: history });
  //     });
  //     this.setState({ message: "" });
  //   }
  // }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "auto" });
    } else {
      return null;
    }
  };

  // sendSocketIO() {
  //   socket.emit('example_message', 'demo');
  // }

  render() {
    let list;
    if (this.state.chatHistory) {
      list = this.state.chatHistory.map((message, idx) => {
        return (
          <li key={idx} className="chat-message">
            <main className="message-sender">
              User: {this.props.currentUser.username}
            </main>
            Message: {message}
          </li>
        );
      });
    }

    if (this.props.channel) {
      return (
        <div className="messages-container">
          {this.props.channel.name}
          <br />
          {this.props.channel._id}
          <ul id="chat-history">
            {this.state.chatHistory}
            {list}
          </ul>

          {this.state.message.length > 0 ? (
            <span>{this.props.currentUser.username} is typing...</span>
          ) : null}

          {/* <div>
            <button onClick={this.sendSocketIO}>Send Socket.io</button>
          </div> */}

          {/* <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="chat-message-input"
              onChange={this.update("message")}
              value={this.state.message}
            />
            <input type="submit" />
          </form> */}
          <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />

          <button onClick={this.sendMessage}>Send</button>
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {this.messagesEnd = el}}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(connect(msp, mdp)(MessagesShow));