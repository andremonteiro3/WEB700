var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");

var dataCollection = require("./modules/collegeData");
var app = express();

app.get("/students", (req, res) => {
  if (req.query.course) {
    dataCollection
      .getStudentsByCourse(req.query.course)
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send({ message: "no results" }));
  } else {
    dataCollection
      .getAllStudents()
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send({ message: "no results" }));
  }
});
app.get("/students/:studentId", (req, res) => {
  dataCollection
    .getStudentByNum(req.params.studentId)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send({ message: "no results" }));
});

app.get("/tas", (req, res) => {
  dataCollection
    .getTAs()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send({ message: "no results" }));
});

app.get("/courses", (req, res) => {
  dataCollection
    .getCourses()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send({ message: "no results" }));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});
app.get("/htmlDemo", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});
app.get("/404.css", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.css"));
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

dataCollection
  .initialize()
  .then(() =>
    app.listen(HTTP_PORT, () =>
      console.log("Server listening on port: " + HTTP_PORT)
    )
  )
  .catch((err) => console.log(err));
