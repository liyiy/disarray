const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Server = require('../../models/Server');
const validateServerCreation = require("../../validation/server");

router.get('/servers', (req, res) => res.json({ msg: "this is the servers route" }));

router.post('/servers', (req, res) => {
  const { errors, isValid } = validateServerCreation(req.body);
})
router.get('/servers/:server_id', (req, res) => {
  Server.find({ id: req.params.server_id })
    .then(server => res.json(server))
})

module.exports = router;

