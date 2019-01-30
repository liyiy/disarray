const express = require('express');
const router = express.Router();
const Channel = require("../../models/Channel");

router.post('/', (req, res) => {

  const newChannel = new Channel({
    name: req.body.name,
    server: req.body.server_id
  });
  console.log(req.body)
  newChannel.save().then(channel => res.json(channel));
});

router.get('/server/:server_id', (req, res) => {
  // console.log("THIS IS THE SERVER ID");
  // console.log(req.body);
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
  Channel.remove({ _id: req.params.channel_id })
    .then(() => res.json({ id: req.params.channel_id }));
});

module.exports = router;

