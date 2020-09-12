var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  author: String,
  comment: String,
  date: {
    type: String,
    default: new Date(),
  },
  postId: String,
});

module.exports = mongoose.model("commentsdb", commentSchema);
