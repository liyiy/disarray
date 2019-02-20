const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Messages = new Schema({
  author: String,
  body: String
});

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  server: {
    type: Schema.Types.ObjectId,
    ref: "Server"
  },
  messages: [Messages],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Server = mongoose.model("channels", ChannelSchema);
