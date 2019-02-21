import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import ServerOptions from './home/server_options';
import NewChannel from './channels/new_channel';

const msp = state => {
  return {
    modal: state.modal
  };
};

const mdp = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

function Modal({modal, closeModal}) {
  if (!modal) {
    return null;
  }

  let component;
  switch(modal) {
    case 'createChannel':
      component = <NewChannel />;
      break;
    case 'serverOptions':
      component = <ServerOptions />;
      break;
    default: 
      return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

export default withRouter(connect(msp, mdp)(Modal));