const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../../models/Message');

router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const newMessage = new Message({
      body: req.body.body,
      author: req.user.id,
      modelId: req.body.modelId,
      onModel: req.body.modelType
    });

    newMessage.save()
      .then(message => res.json(message))
      .catch(err => res.json(err))
  }
);

router.get('/', (req, res) => {
  Message.find({ modelId: req.body.modelId })
    .then(messages => res.json(messages))
})

module.exports = router;