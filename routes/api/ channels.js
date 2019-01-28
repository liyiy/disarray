const express = require('express');
const router = express.Router();
const Channel = require("../../models/Channel");

router.post('/', (req, res) => {

  const newChannel = new Channel({
    name: req.body.name,
    server: req.body.server_id
  });

  newChannel.save().then(channel => res.json(channel));
});

router.get('/', (req, res) => {

  Channel.find({ server: req.body.server_id })
    .then(channels => res.json(channels));
});

router.get('/:channel_id', (req, res) => {

  Channel.findById(req.params.channel_id)
    .then(channel => res.json(channel))
    .catch(err => res.status(404).json({ msg: "no channel found" }));
});

router.delete('/:channel_id', (req, res) => {
  Channel.remove({ _id: req.params.channel_id })
    .then(() => res.json({ id: req.params.server_id }));
});

module.exports = router;

