const express = require('express');
const router = express.Router();
const passport = require('passport');

const Server = require('../../models/Server');
const User = require('../../models/User');
const Channel = require('../../models/Channel');
// const validateServerCreation = require("../../validation/server");

router.get('/servers', (req, res) => res.json({ msg: "this is the servers route" }));

router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateServerCreation(req.body);

    // if	(!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newServer = new Server({
      name: req.body.name,
      owner: req.user.id,
    });

    newServer.users.push({ _id: req.user.id, username: req.user.username });

    const defaultChannel = new Channel({
      name: "general",
      server: newServer.id
    });

    newServer.channels.push({ _id: defaultChannel.id, name: "general"});

    User.findById(req.user.id, function (err, user) {
      if (!err) {
        user.servers.push({ _id: newServer._id, name: req.body.name });
        user.save();
      }
    });

    defaultChannel.save();
    
    newServer.save().then(server => res.json(server));
});


router.get('/', passport.authenticate('jwt', { session: false }),
(req, res) => {
  // const { errors, isValid } = validateServerCreation(req.body);
  
  // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    res.json({
      servers: req.user.servers
    });

});

router.get('/:server_id', (req, res) => {
  Server.findById(req.params.server_id)
    .then(server => res.json(server))
    .catch(err => res.status(404).json({ msg: "no server found" }));
});

// router.patch('/:server_id', (req, res) => {
//   Server.find({ id: req.params.server_id })
// })

router.patch('/join', passport.authenticate('jwt', { session: false }), (req, res) => {

  let serverName;

  Server.findById(req.body.serverId, function(err, server) {
    if (!err) {
      server.users.push({ _id: req.user.id, username: req.user.username});
      serverName = server.name;
      server.save();

      User.findById(req.user.id, function(err, user) {
        if (!err) {
          user.servers.push({ _id: req.body.serverId, name: server.name });
          user.save();
        };
      });
    };
  }).then(server => res.json(server));
});

router.delete('/:server_id', (req, res) => {

  Server.findById(req.params.server_id, function(err, server) {
    server.users.forEach(user => {
      User.findById(user._id, function (err, user) {
        if (!err) {
          user.servers.id(server._id).remove();
          user.save();
        }
      });
    });
    server.channels.forEach(channel => {
      Channel.remove({ _id: channel._id })
        .then(() => null)
    });
    Server.remove({ _id: req.params.server_id })
      .then(() => res.json({ id: req.params.server_id }));
  });
});

module.exports = router;

