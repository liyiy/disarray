const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  server: {
    type: Schema.Types.ObjectId,
    ref: "Server"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Server = mongoose.model("channels", ChannelSchema);
