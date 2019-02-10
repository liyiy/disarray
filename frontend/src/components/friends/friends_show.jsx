import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { fetchFriends, sendFriendRequest, acceptFriendRequest } from '../../actions/friend_actions';


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
    fetchFriends: () => dispatch(fetchFriends()),
    sendFriendRequest: data => dispatch(sendFriendRequest(data)),
    acceptFriendRequest: data => dispatch(acceptFriendRequest(data))
  };
};

class FriendsShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {id: "", username: "", accepted: false, add: true, type: "Incoming"};
    this.sendFriendRequest = this.sendFriendRequest.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
  }
  

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchFriends();
  }

  sendFriendRequest(e, friend) {
    e.stopPropagation();
    this.setState({id: friend.id, username: friend.username, accepted: false, add: true, type: "Incomng"}, () => 
    this.props.sendFriendRequest(this.state));
  }

  acceptFriendRequest(e, friend) {
    e.stopPropagation();
    debugger 
    this.setState({id: friend.id, username: friend.username, add: true, accepted: true }, () => 
    this.props.acceptFriendRequest(this.state)
    );
  }

  render() {
    let users2;
    if (this.props.users) {
      users2 = this.props.users.map(user => {
        return (

          <li>
            email: {user.email}, username: {user.username}
            <button onClick={(e) => this.sendFriendRequest(e, {id: user.id, username: user.username})}>send request</button>
          </li>
        )
      })
    }
    let friends = this.props.friends.map((friend, idx) => {
      let pending;
        if (friend.accepted === false) {
          pending = <button onClick={(e) => this.acceptFriendRequest(e, {id: friend._id, username: friend.username})}>accept</button>
        } 
      return (
        <li key={idx}>{friend.username}{pending}</li>
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