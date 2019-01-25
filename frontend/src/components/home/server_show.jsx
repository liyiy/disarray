import React from 'react';
import { fetchServer } from '../../actions/server_actions';
import { connect } from 'react-redux';

const msp = (state, ownProps) => {
  debugger 
  return {
    server: state.entities.servers[ownProps.match.params.serverId]
  };
};

const mdp = dispatch => {
  return {
    fetchServer: (id) => dispatch(fetchServer(id))
  }
}

class ServerShow extends React.Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount

  render() {
    debugger 
    if (this.props.server) {
      return (
        <>
          <div>{this.props.server.name}</div>
        </>
      )
    } else {
      return null;
    }
  }

}

export default connect(msp, mdp)(ServerShow);