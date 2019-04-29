import React from 'react';
import { connect } from 'react-redux';
import { fetchServer } from '../../actions/server_actions';

const msp = (state, ownProps) => {
  let serverUsers;
  if (state.entities.servers[ownProps.match.params.serverId]) {
    serverUsers = state.entities.servers[ownProps.match.params.serverId].users;
  }
  return {
    serverId: ownProps.match.params.serverId,
    serverUsers: serverUsers
  };
};

const mdp = dispatch => {
  return {
    fetchServer: id => dispatch(fetchServer(id))
  };
};

class ServerUsersShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchServer(this.props.serverId);
  }

  render() {
    let names;
    if (this.props.serverUsers) {
      names = this.props.serverUsers.map((user, idx) => {
        return (
          <li key={idx}>{user.username}</li>
        )
      });
    };

    return (
      <div className="users-list">
      <div>MEMBERS</div>
      <ul>{names}</ul>
      </div>
    )
  }
}

export default connect(msp, mdp)(ServerUsersShow);