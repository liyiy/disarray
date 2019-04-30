import React from 'react';

const ServerInvite = ({serverId}) => {
  console.log(serverId)
  return(
    <main className="server-invite-modal">
      <h1>{serverId}</h1>
    </main>
  )
}

export default ServerInvite;