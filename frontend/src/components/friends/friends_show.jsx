import React from 'react';
import { connect } from 'react-redux';

const msp = (state) => {
  return {

  };
};

const mdp = dispatch => {
  return {

  };
};

class FriendsShow extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          <div>
            pooop
          </div>
          <div>
          THIS IS FRIENDS SHOW :DD
          </div>
          <div>
            me
          </div>
        </div>
      </>
    )
  }

};

export default connect(msp, mdp)(FriendsShow);