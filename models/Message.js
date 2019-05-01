const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Server = new Schema({
  _id: String,
  name: String
}, { _id: false });

const Channel = new Schema({
  _id: String,
  name: String
})

const Friend = new Schema({
  _id: String,
  username: String,
  accepted: Boolean,
  type: String,
  date: Date
}, { _id: false });

const MessageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  body: {
    type: String,
    required: true
  },
  // modelId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   refPath: "onModel"
  // },
  // onModel: {
  //   type: String,
  //   required: true,
  //   enum: ['Channel', 'Friend']
  // },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Messages = mongoose.model("messages", MessageSchema);
