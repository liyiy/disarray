import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';

const msp = (state) => {
  let users;
  if (state.entities.users) {
    users = Object.values(state.entities.users);
  }
  return {
    users: users
  };
};

const mdp = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
};

class FriendsShow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUsers();
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
    return (
      <>
        <div>
          <div>
            pooop
          </div>
          <div>
          THIS IS FRIENDS SHOW :DD
          <ul>
            {users2}
          </ul>
          </div>

        </div>
      </>
    )
  }

};

export default connect(msp, mdp)(FriendsShow);