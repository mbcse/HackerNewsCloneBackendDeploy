const router = require("express").Router();
const userAuth = require("../controllers/userAuth.controller");
const restricted = require("../services/restricted.middleware");

// router.get("/users", restricted, (req, res) => {
//   // Users.find()
//   //   .then((users) => {
//   //     res.status(200).json(users);
//   //   })
//   //   .catch((err) => res.send(err));
// });

router.post("/register", userAuth.register);

router.post("/login", userAuth.login);

router.get("/logout", userAuth.logout);

module.exports = router;
