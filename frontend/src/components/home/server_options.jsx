import React from 'react';
import NewServer from './new_server';
import ServerJoin from './join_server';


const ServerOptions = () => {
  return (
    <div className="server-options-container">
      <NewServer/>
      {/* <ServerJoin/> */}
    </div>
  )
}

export default ServerOptions;