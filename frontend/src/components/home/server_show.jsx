import React from 'react';
import { fetchServer } from '../../actions/server_actions';
import { connect } from 'react-redux';

const msp = (state, ownProps) => {
  return {
    server: state.entities.servers[ownProps.match.params.serverId],
    user: state.session.username
  };
};

const mdp = dispatch => {
  return {
    fetchServer: (id) => dispatch(fetchServer(id))
  };
};

class ServerShow extends React.Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount

  render() {
    if (this.props.server) {
      return (
        <>
          <div className="server-show-container">
            <div className="server-show-header">
              {this.props.server.name}
            </div>
            <div className="filler-channels">
            </div>
          <div className="server-show-user">
            {this.props.user}
          </div>
          </div>
          
        </>
      )
    } else {
      return null;
    }
  }

}

export default connect(msp, mdp)(ServerShow);

//<div className="server-invite">
//  <div>
//    An adventure begins. 
//    <br />
//    Let's add some party members!
//  </div>