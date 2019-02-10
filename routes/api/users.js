const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require("../../config/keys");
const passport = require('passport');
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require("../../validation/login");

// This is the test route
router.get('/test', (req, res) => res.json({ msg: "this is the users route" }));

// This allows users to register
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // Throw an error if user already exists
        errors.email = 'Email already exists';
        return res.status(400).json(errors)
      } else {
        // Otherwise create a new user
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
        // Salt and hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const payload = { id: user.id, username: user.username, email: user.email };

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
});

// This allows users to log in
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {id: user.id, username: user.username, email: user.email};

            jwt.sign(
              payload,
              keys.secretOrKey,
              // Tells the key to expire in one hour
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            errors.password = "Incorrect password";
            return res.status(400).json(errors);
          }
        })
    })
});

// Makes sure the token is correct and return user
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    friends: req.user.friends,
    servers: req.user.servers
  });
});

router.patch('/friends', passport.authenticate('jwt', {session: false}), (req, res) => {
  
  if (req.body.add) {
    if (req.body.accepted == false) {
      User.findById(req.user.id, function (err, user) {
        if (!err) {
          user.friends.push({ _id: req.body.id, username: req.body.username, accepted: false, type: "Outgoing"});
          user.save();
        }
      });
      User.findById(req.body.id, function(err, user) {
        if (!err) {
          user.friends.push({ _id: req.user.id, username: req.user.username, accepted: false, type: "Incoming" });
          user.save();
        }
      });
    }
    else {
      User.findById(req.user.id, function(err, user) {
        if (!err) {
          user.friends.id(req.body.id).remove();
          user.friends.push({ _id: req.body.id, username: req.body.username, accepted: true, type: "Incoming" });
          user.save();
        }
      });
      User.findById(req.body.id, function(err, user) {
        if (!err) {
          user.friends.id(req.user.id).remove();
          user.friends.push({ _id: req.user.id, username: req.body.username, accepted: true, type: "Outgoing"});
        }
      });
    }
  } else {
    User.findById(req.user.id, function(err, user) {
      if (!err) {
        user.friends.id(req.body.id).remove();
        user.save();
      }
    });
  }

  res.json({
    id: req.body.id,
    username: req.body.username,
    accepted: req.body.accepted,
    type: req.body.type
  });

});

router.get('/friends', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    friends: req.user.friends
  });
});

router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    var userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = {id: user._id, email: user.email, username: user.username}
    });

    res.send(userMap);
  });
});

module.exports = router;

