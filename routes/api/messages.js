const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../../models/Message');

router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newMessage = new Message({
      body: Object.keys(req.body)[0],
      author: req.user.id
    });
    console.log(Object.keys(req.body)[0]);
    newMessage.save()
      .then(message => res.json(message))
      .catch(err => res.json(err));
  }
);

router.get('/:modelId', (req, res) => {
  Message.find({ modelId: req.params.modelId })
    .then(messages => res.json(messages))
})

module.exports = router;