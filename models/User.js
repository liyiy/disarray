const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Friends = new Schema({
  username  : String,
  accepted  : Boolean,
  date  : Date
});

const UserSchema = new Schema({
  username: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  servers: {
    type: Schema.Types.ObjectId,
    ref: 'Server'
  },
  friends: [Friends],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Friend = mongoose.model('friends', Friends);
module.exports = User = mongoose.model('users', UserSchema);