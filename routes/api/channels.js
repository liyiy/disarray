const express = require('express');
const router = express.Router();
const Channel = require("../../models/Channel");
const Server = require("../../models/Server");

router.post('/', (req, res) => {

  const newChannel = new Channel({
    name: req.body.name,
    server: req.body.server_id
  });

  // const server = Server.find({ _id: req.body.server_id });
  // server.channels.push(newChannel.id);
  Server.findByIdAndUpdate(
    req.body.server_id, 
    {$push: {channels: newChannel._id}},
    {$safe: true, upsert: true, new: true},
    function(err, model) {
      console.log(err);
  });

  // Server.find({ _id: req.body.server_id }).channels.push(newChannel.id);
  newChannel.save()
    .then(channel => res.json(channel))
    .catch(err => res.json(err))
});

router.get('/server/:server_id', (req, res) => {
  Channel.find({ server: req.params.server_id })
    .then(channels => res.json(channels))
    .catch(err => res.status(404).json({ msg: "can't find channels" }));
});

// router.get('/', (req, res) => {
//   Channel
// })

router.get('/:channel_id', (req, res) => {

  
  Channel.findById(req.params.channel_id)
  .then(channel => res.json(channel))
  .catch(err => res.status(404).json({ msg: "no channel found" }));
});

router.delete('/:channel_id', (req, res) => {
  // let channel = Channel.findById(req.params.channel_id);
  Server.findOneAndUpdate(
    { channels: req.params.channel_id },
    { $pull: { channels: req.params.channel_id } },
    { new: true },
    function (err, model) {
      console.log(err);
  });
  Channel.remove({ _id: req.params.channel_id })
    .then(() => res.json({ id: req.params.channel_id }));
});

module.exports = router;

