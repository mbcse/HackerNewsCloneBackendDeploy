var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hi Welcome to HackerNewsClone");
  res.end();
});

module.exports = router;
