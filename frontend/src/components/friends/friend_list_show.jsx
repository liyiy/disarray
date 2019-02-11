import React from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../../actions/friend_actions';

const msp = state => {
  return {
    friends: Object.values(state.entities.friends),
    user: Object.values(state.session.username)
  };
};

const mdp = dispatch => {
  return {
    fetchFriends: () => dispatch(fetchFriends())
  };
};

class FriendListShow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchFriends();
  }

  render() {
    let friends = this.props.friends.map((friend, idx) => {
      return (
        <li key={idx}>{friend.username}</li>
      )
    })

    return (
      <>
        <div className="server-show-container">
          <div className="server-show-header">
            find or start a conversation
          </div>
          <div>
            Friends
          </div>
          <div className="direct-messages-container">
            Direct Messages
          </div>
          <ul>
            {friends}
          </ul>
          <div className="server-show-user">
            {this.props.user}
          </div>
        </div>
      </>
    )
  }
  
};

export default connect(msp, mdp)(FriendListShow);