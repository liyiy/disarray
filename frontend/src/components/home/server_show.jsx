import React from 'react';
import { fetchServer, deleteServer } from '../../actions/server_actions';
import { fetchChannels } from '../../actions/channel_actions';
import { connect } from 'react-redux';
import ChannelList from '../channels/channel_list';
import { logoutUser } from '../../util/session_api_util';


const msp = (state, ownProps) => {
  let channels;
  if (state.entities.channels) {
    channels = Object.values(state.entities.channels);
  } 

  return {
    server: state.entities.servers[ownProps.match.params.serverId],
    serverId: ownProps.match.params.serverId,
    user: state.session.username,
    channels: channels,
  };
};

const mdp = dispatch => {
  return {
    fetchServer: (id) => dispatch(fetchServer(id)),
    fetchChannels: (id) => dispatch(fetchChannels(id)),
    logoutUser: () => dispatch(logoutUser()),
    deleteServer: serverId => dispatch(deleteServer(serverId))
  };
};

class ServerShow extends React.Component {

  constructor(props) {
    super(props);
    this.deleteServer = this.deleteServer.bind(this);

  }

  componentDidMount() {
    if (this.props.server) {
      this.props.fetchChannels(this.props.server._id)
        .then(channels => {
          if (channels.payload.data.length > 0) {
            this.props.history.push(`${this.props.server._id}/${channels.payload.data[0]._id}`);
          } else {
            return null;
          }
        });
    };
  };

  deleteServer(e, serverId) {
    e.stopPropagation();
    this.props.deleteServer(serverId).then(this.props.history.push(`/channels/@me`));
  };

  componentDidUpdate(oldProps) {
    if (oldProps.server) {
      if (oldProps.server._id !== this.props.server._id) {
        this.props.fetchChannels(this.props.server._id)
          .then(channels => {
            if (channels.payload.data.length > 0) {
              this.props.history.push(`${this.props.server._id}/${channels.payload.data[0]._id}`);
            } else {
              return null;
            }
          });
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
            <button className="server-delete" onClick={(e) => this.deleteServer(e, this.props.server._id)}>Delete server</button>

          <div className="server-show-user">
              <img className="avatar" src={require("./discord-avatar.png")}>
              </img>
            {this.props.user}
            <button onClick={this.props.logoutUser}>Quit</button>

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
