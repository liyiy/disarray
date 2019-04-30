import React from 'react';
import { connect } from 'react-redux';
import { fetchServers } from '../../actions/server_actions';
import ServerList from './server_list';

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