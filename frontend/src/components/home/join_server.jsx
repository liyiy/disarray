import React from 'react';
import { connect } from 'react-redux';
import { joinServer } from '../../actions/server_actions';
import { closeModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
  return {
    
  }
}

const mdp = dispatch => {
  return {
    joinServer: data => dispatch(joinServer(data)),
    closeModal: () => dispatch(closeModal())
  };
};

class ServerJoin extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { serverId: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.joinServer(this.state)
      .then(this.props.closeModal());
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className="join-server-container">
        <h1>Join a Server</h1>
        <input type="text" 
               className="join-server-id"
               onChange={this.update("serverId")}
               value={this.state.serverId}
               required
        />
        <input type="submit"></input>
      </form>
    );
  };
};

export default connect(msp, mdp)(ServerJoin);


