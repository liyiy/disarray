import React from 'react';
import { fetchServer } from '../../actions/server_actions';
import { fetchChannels } from '../../actions/channel_actions';
import { connect } from 'react-redux';
import ChannelList from '../channels/channel_list';

const msp = (state, ownProps) => {
  let channels;
  if (state.entities.channels) {
    channels = Object.values(state.entities.channels);
  } 
  return {
    server: state.entities.servers[ownProps.match.params.serverId],
    serverId: ownProps.match.params.serverId,
    user: state.session.username,
    channels: channels
  };
};

const mdp = dispatch => {
  return {
    fetchServer: (id) => dispatch(fetchServer(id)),
    fetchChannels: (id) => dispatch(fetchChannels(id))
  };
};

class ServerShow extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.fetchServer(this.props.serverId);
    if (this.props.server) {
      this.props.fetchChannels(this.props.server);
    };
  };

  // componentWillUnmount() {
  //   this.setState({channels: []});
  // }

  componentDidUpdate(oldProps) {
    if (oldProps.server) {
      if (oldProps.server._id !== this.props.server._id) {
        this.props.fetchChannels(this.props.server._id);
      };
    };
  };

  render() {
    if (this.props.server) {
      return (
        <>
          <div className="server-show-container">
            <div className="server-show-header">
              {this.props.server.name}
            </div>
            <div className="filler-channels">
              <ChannelList 
                channels={this.props.channels} 
                serverId={this.props.server._id} />
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
