var mongoose = require("mongoose");

var postsSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  link: {
    type: String,
    unique: true,
  },
  text: String,
  authorId: String,
  comments: [String],
  upvote: {
    type: Number,
    default: 0,
  },
  upvoters: [String],
});

module.exports = mongoose.model("postsdb", postsSchema);
