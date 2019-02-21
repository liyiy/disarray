import React from 'react';
import { fetchServer } from '../../actions/server_actions';
import { fetchChannels } from '../../actions/channel_actions';
import { connect } from 'react-redux';
import ChannelList from '../channels/channel_list';
import { Redirect } from 'react-router-dom';

const msp = (state, ownProps) => {
  let channels;
  if (state.entities.channels) {
    channels = Object.values(state.entities.channels);
  } 
  // if (state.entities.servers[ownProps.match.params.serverId].users) {
  //   serverUsers = state.entities.servers[ow]
  // }
  return {
    server: state.entities.servers[ownProps.match.params.serverId],
    serverId: ownProps.match.params.serverId,
    user: state.session.username,
    channels: channels,
    // serverUsers: state.entities.servers[ownProps.match.params.serverId].users
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
    this.props.fetchChannels(this.props.serverId)
      .then(channels => {
        if (channels.payload.data.length > 0) {
          this.props.history.push(`${this.props.serverId}/${channels.payload.data[0]._id}`);
        } else {
          return null;
        }
    });
  };

  componentDidUpdate(oldProps) {
    if (oldProps.server) {
      if (oldProps.server._id !== this.props.server._id) {
        this.props.history.push(`${this.props.server._id}/${this.props.channels[0]._id}`);
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
