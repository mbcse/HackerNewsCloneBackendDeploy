var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var MemoryStore = require("memorystore")(session);
var mongoose = require("mongoose");

const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userAuth.route");
var postsRouter = require("./routes/posts.route");

var app = express();

app.use(
  session({
    secret: "Hackernew-opo1121",
    // resave: false,
    // store: new MemoryStore({
    //   checkPeriod: 86400000, // prune expired entries every 24h
    // }),
    // saveUninitialized: true,
    // cookie: { httpOnly: false },
  })
);

// MongoDB Connect
var dburl =
  "mongodb+srv://user1:12345@hackernewsclone.0qubq.mongodb.net/HackerNews?retryWrites=true&w=majority";

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.once("open", function () {
  console.log("MongoDb Connected");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/", indexRouter);
app.use("/users/", usersRouter);
app.use("/posts/", postsRouter);

app.listen(process.env.PORT || 8081, () => {
  console.log("APPLICATION STARTED");
});
//module.exports = app;
