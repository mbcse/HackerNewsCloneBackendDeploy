module.exports = (req, res, next) => {
  console.log("User Session Details: ", req.session);
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(403).json({
      message: "Please Log In First",
    });
  }
};
