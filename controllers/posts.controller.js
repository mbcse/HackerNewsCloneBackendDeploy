var postdb = require("../models/posts.model");
var userdb = require("../models/users.model");
var commentdb = require("../models/comments.model");
var postServices = require("../services/posts.service");
var mongoose = require("mongoose");
module.exports = {
  uploadPost: async (req, res) => {
    let { title, link, text } = req.body;
    console.log(title, link, text);
    if (title && (link || text)) {
      postServices
        .duplicateTitle(title)
        .then(async (status) => {
          console.log("Duplicate Title: ", status);
          if (link) {
            postServices
              .duplicateLink(link)
              .then(async (status) => {
                console.log("Duplicate Link: ", status);
                var status = await postServices.insertLink(req, title, link);
                if (status) res.status(201).json({ Status: true });
              })
              .catch((e) => {
                res.status(411).json({ error: e });
              });
          } else {
            var status = await postServices.insertText(req, title, text);
            if (status) res.status(201).json({ Status: true });
          }
        })
        .catch((e) => {
          res.status(411).json({ error: e });
        });
    } else {
      res.status(411).json({ error: "Please Fill All The Details" });
    }
  },
  deletePost: async (req, res) => {
    var id = req.param.id;
    var post = await postdb.findById(id);
    if (post.author == req.session.username) {
      var result = await postdb.findByIdAndDelete(id);
      var user = await postdb.findById(req.session.userId);
      user.posts.pop(id);
      var status = await user.save();
      if (result && status) res.json({ status: true });
      else res.status(500).json({ status: false });
    } else {
      res.status(401).json({ error: "Not Authorised to delete " });
    }
  },
  comment: async (req, res) => {
    let comment = req.body; //postid,comment
    var post = await postdb.findById(comment.postid);
    console.log(post);
    var newComment = await new commentdb({
      author: req.session.username,
      comment: comment.comment,
      postId: comment.postid,
    }).save();
    post.comments.push(newComment._id);
    var status = await post.save();
    if (status) res.json({ status: true });
    else res.status(501).json({ error: false });
  },
  deleteComment: async (req, res) => {
    var commentId = req.params.id;
    var comment = await commentdb.findById(commentId);
    if (comment.author == req.session.username) {
      var post = await postdb.findById(comment.postId);
      post.comments.pop(comment._id);
      var status1 = await post.save();
      var status2 = await commentdb.findByIdAndDelete(commentId);
      if (status1 && status2) res.json({ status: true });
      else res.status(501).json({ error: false });
    } else {
      res.status(402).json({ error: "Not Authorised" });
    }
  },
  upvote: async (req, res) => {
    var postId = req.params.id;
    var post = await postdb.findById(postId);
    var upvoted = await post.upvoters.indexOf(req.session.username);
    if (upvoted == -1) {
      post.upvote = post.upvote + 1;
      post.upvoters.push(req.session.username);
      post.save();
      res.json({ status: true });
    } else {
      res.status(402).json({ error: "Already Upvoted" });
    }
  },

  getUpvotes: async (req, res) => {
    var post = await postdb.findById(req.params.id);
    console.log(post);
    if (post) {
      res.json({ upvotes: post.upvote });
    } else {
      res.status(406).json({ error: "Post Not Found" });
    }
  },
  getAllComments: async (req, res) => {
    var post = await postdb.findById(req.params.id);
    if (post) {
      res.json({ comments: post.comments });
    } else {
      res.status(406).json({ error: "Post Not Found" });
    }
  },
  getComment: async (req, res) => {
    var comment = await commentdb.findById(req.params.id);
    if (comment) {
      res.json({ comment: comment });
    } else {
      res.status(406).json({ error: "Comment Not Found" });
    }
  },
  getAllPosts: async (req, res) => {
    var posts = await postdb.find({});
    res.json({ posts: posts });
  },
};
