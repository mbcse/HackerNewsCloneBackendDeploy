var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [String],
});

module.exports = mongoose.model("users", userSchema);
