const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  _id: String,
  username: String
}, { _id: false });

const ServerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  users: [User],
  // channels: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Channel'
  // },
  // channels: {
  //   type: Array,
  // },
  date: {
    type: Date,
    default: Date.now()
  }
});


module.exports = Server = mongoose.model('servers', ServerSchema);