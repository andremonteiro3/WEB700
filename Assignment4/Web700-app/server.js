/*********************************************************************************
 *  WEB700 – Assignment 04
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part
 *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Andre Hideo Onoda Monteiro Student ID: 101947232 Date: 06/11/2024
 *
 ********************************************************************************/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");

var dataCollection = require("./modules/collegeData");
var app = express();

app.use(express.static("./public/"));
app.use(express.urlencoded({ extended: true }));

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

app.get("/students/add", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "addStudent.html"));
});

app.post("/students/add", (req, res) => {
  dataCollection
    .addStudent(req.body)
    .then((v) => res.status(200).send({ studentNum: v }))
    .catch((err) =>
      res.status(500).send({ message: "Couldn't register student." }),
    );
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

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

dataCollection
  .initialize()
  .then(() =>
    app.listen(HTTP_PORT, () =>
      console.log("Server listening on port: " + HTTP_PORT),
    ),
  )
  .catch((err) => console.log(err));
