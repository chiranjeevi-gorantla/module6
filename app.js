const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const methodOverride = require("method-override");
const storyRoutes = require("./routes/storyRoutes");

const app = express();

let port = 3000;
let hostname = "localhost";

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/stories", storyRoutes);

app.use((req, res, next) => {
  let err = new Error("The server cannot locate " + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }

  res.status(err.status);
  res.render("error", { error: err });
});

app.listen(port, hostname, (req, res) => {
  console.log("Server is running on port", port);
});
