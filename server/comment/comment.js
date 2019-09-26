const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: { type: String },
  commentBy: { type: String },
  createdAt: { type: Date, default: Date.now }
  // ,commentTo: {type: Schema.Types.ObjectId, ref: 'co'}
});

const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;
