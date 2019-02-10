import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { fetchFriends } from '../../actions/friend_actions';
const msp = (state) => {
  let users;
  if (state.entities.users) {
    users = Object.values(state.entities.users);
  }
  return {
    users: users,
    friends: Object.values(state.entities.friends)
  };
};

const mdp = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchFriends: () => dispatch(fetchFriends())
  };
};

class FriendsShow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchFriends();
  }

  render() {
    let users2;
    if (this.props.users) {
      users2 = this.props.users.map(user => {
        return (
          <li>
            email: {user.email}, username: {user.username}
          </li>
        )
      })
    }
    let friends = this.props.friends.map((friend, idx) => {
      return (
        <li key={idx}>{friend.username}</li>
      )
    })
    return (
      <div className="friends-show-container">
        <div className="friends-status-bar">
          <div className="add-friend">Add friend</div>
          <div>All</div>
          <div>Online</div>
          <div>Pending</div>
        </div>
        <div className="name-status-bar">
          <div>Name </div><div className="line"></div> 
          <div>Status </div><div className="line"></div>
        </div>
          <div className="friends">
            <ul className="friends-list">
              {friends}
            </ul>
          </div>
        <div>users test {users2}</div>
        </div>
    )
  }

};

export default connect(msp, mdp)(FriendsShow);