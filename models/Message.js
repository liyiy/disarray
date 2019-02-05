const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "onModel"
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Channel', 'Friend']
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Server = mongoose.model("messages", MessageSchema);
