const express = require('express');
const router = express.Router();
const Channel = require("../../models/Channel");
const Server = require("../../models/Server");

router.post('/', (req, res) => {

  const newChannel = new Channel({
    name: req.body.name,
    server: req.body.server_id
  });


  // User.findById(req.user.id, function (err, user) {
  //   if (!err) {
  //     user.servers.push({ _id: newServer._id, name: req.body.name });
  //     user.save();
  //   }
  // });

  Server.findById(req.body.server_id, function(err, server) {
    if (!err) {
      server.channels.push({ _id: newChannel.id, name: req.body.name});
      server.save();
    }
  });

  newChannel.save()
    .then(channel => res.json(channel))
    .catch(err => res.json(err));
});

router.get('/server/:server_id', (req, res) => {
  Channel.find({ server: req.params.server_id })
    .then(channels => res.json(channels))
    .catch(err => res.status(404).json({ msg: "can't find channels" }));
});


router.get('/:channel_id', (req, res) => {
  
  Channel.findById(req.params.channel_id)
  .then(channel => res.json(channel))
  .catch(err => res.status(404).json({ msg: "no channel found" }));
});

router.delete('/:channel_id', (req, res) => {

  Server.findById(req.body.server, function(err, server) {
    if(!err) {
      server.channels.id(req.params.channel_id).remove();
      server.save();
    }
  });

  Channel.remove({ _id: req.params.channel_id })
    .then(() => res.json({ id: req.params.channel_id }));
});

module.exports = router;

