const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: { type: String, required: true },
  commentBy: { type: String, required: true },
  commentTo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;
