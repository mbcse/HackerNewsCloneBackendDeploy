var postdb = require("../models/posts.model");
var userdb = require("../models/users.model");

module.exports = {
  duplicateTitle: async (title) => {
    return new Promise(async (resolve, reject) => {
      var post = await postdb.findOne({ title: title });
      if (!post) resolve(false);
      else reject("Dupplicate Title");
    });
  },
  duplicateLink: async (link) => {
    return new Promise(async (resolve, reject) => {
      var post = await postdb.findOne({ link: link });
      if (!post) resolve(false);
      else reject("Dupplicate Link");
    });
  },

  insertLink: async (req, title, link) => {
    return new Promise(async (resolve, reject) => {
      var newPost = await new postdb({
        title: title,
        link: link,
        author: req.session.username,
      }).save();

      if (!newPost) {
        reject("Cannot Insert");
      }
      console.log(req.session);
      var user = await userdb.findById(req.session.userId);
      user.posts.push(newPost._id);
      var status = await user.save();

      if (!status) {
        reject("Cannot Insert");
      }
      resolve(true);
    });
  },

  insertText: async (req, title, text) => {
    return new Promise(async (resolve, reject) => {
      var newPost = await new postdb({
        title: title,
        text: text,
        author: req.session.username,
      }).save();

      if (!newPost) {
        reject("Cannot Insert");
      }
      console.log(req.session.id);
      var user = await userdb.findById(req.session.userId);
      user.posts.push(newPost._id);
      var status = await user.save();

      if (!status) {
        reject("Cannot Insert");
      }
      resolve(true);
    });
  },
};
