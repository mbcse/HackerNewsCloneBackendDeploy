const router = require("express").Router();
const postController = require("../controllers/posts.controller");
const restricted = require("../services/restricted.middleware");

router.post("/post", restricted, postController.uploadPost);

router.delete("/post/:id", restricted, postController.deletePost);

router.post("/comment", restricted, postController.comment);

router.delete("/comment/:id", restricted, postController.deleteComment);

router.put("/upvote/:id", restricted, postController.upvote);

router.get("/", postController.getAllPosts);

router.get("/postcomments/:id", postController.getAllComments);

router.get("/comment/:id", postController.getComment);

router.get("/upvote/:id", postController.getUpvotes);

module.exports = router;
