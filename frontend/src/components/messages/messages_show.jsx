import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMessages, createMessage } from '../../actions/message_actions';
import io from 'socket.io-client'

const msp = (state, ownProps) => {
  return {
    channel: state.entities.channels[ownProps.match.params.channelId],
    currentUser: state.session
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
    super(props);
    this.socket = io("localhost:3000");
    this.state = { message: "", chatHistory: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.message === "") {
      return null;
    } else {
      this.socket.emit("chat message", this.state.message);
      const history = this.state.chatHistory.concat(this.state.message);
      this.socket.on("chat message", message => {
        this.setState({ chatHistory: history });
      });
      this.setState({ message: "" });
    }
  }

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
            {/* {this.state.chatHistory} */}
            {list}
          </ul>

          {this.state.message.length > 0 ? (
            <span>{this.props.currentUser.username} is typing...</span>
          ) : null}

          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="chat-message-input"
              onChange={this.update("message")}
              value={this.state.message}
            />
            <input type="submit" />
          </form>
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