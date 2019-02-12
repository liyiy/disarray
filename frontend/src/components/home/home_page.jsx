import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchServers } from '../../actions/server_actions';
import ServerList from './server_list';
import ServerShow from './server_show';
import io from 'socket.io-client';

const msp = (state, ownProps) => {
  return {
    servers: state.entities.servers
  };
};

const mdp = dispatch => {
  return {
    fetchServers: () => dispatch(fetchServers())
  };
};


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchServers();
  }

  render() {
    return (
      // <div className="home">
        <ServerList servers={this.props.servers}/>
        // <Route exact path='/servers/:serverId' component={ServerShow} />
      // </div>
    )
  }
}

export default connect(msp, mdp)(Home);