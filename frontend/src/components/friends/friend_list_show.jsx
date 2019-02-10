import React from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../../actions/friend_actions';

const msp = state => {
  return {
    friends: Object.values(state.entities.friends)
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
          <div className="direct-messages-container">
            Direct Messages/Friends
          <ul>
            {friends}
          </ul>
          </div>
          <div className="server-show-user">
            me
          </div>
        </div>
      </>
    )
  }
  
};

export default connect(msp, mdp)(FriendListShow);