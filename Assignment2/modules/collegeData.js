class Data {
  courses;
  students;

  constructor(students, courses) {
    this.courses = courses;
    this.students = students;
  }
}

dataCollection = null;

const fs = require("fs");
const path = require("path");

export function initialize() {
  let studentsFilePath = path.resolve(__dirname, "..", "data", "students.json");
  let coursesFilePath = path.resolve(__dirname, "..", "data", "courses.json");

  let initializePromise = new Promise(function (resolve, reject) {
    fs.readFile(studentsFilePath, "utf-8", function (err, studentsFileStr) {
      if (err) {
        reject("unable to read students.json");
        return;
      }

      let studentsFileData = JSON.parse(studentsFileStr);
      fs.readFile(coursesFilePath, "utf-8", function (err, coursesFileStr) {
        if (err) {
          reject("unable to read courses.json");
          return;
        }

        let coursesFileData = JSON.parse(coursesFileStr);
        this.dataCollection = new Data(studentsFileData, coursesFileData);
        resolve("Initialization Successful");
      });
    });
  });
  return initializePromise;
}

export function checkInitialized(reject) {
  if (dataCollection == null) {
    reject("Data Collection not initialized.");
    return false;
  }
  return true;
}

export function getAllStudents() {
  getAllStudentsPromise = new Promise(function (resolve, reject) {
    if (!checkInitialized(reject)) {
      return;
    }
    if (
      dataCollection.students == null ||
      dataCollection.students.length <= 0
    ) {
      reject("No results returned.");
      return;
    }
    resolve(dataCollection.students);
  });
  return getAllStudentsPromise;
}

export function getTAs() {
  getTAsPromise = new Promise(function (resolve, reject) {
    getAllStudents()
      .then((allStudents) => {
        let filteredStudents = dataCollection.students.filter(
          (student) => student.TA == true
        );

        if (filteredStudents.length <= 0) {
          reject("No results returned.");
          return;
        }

        resolve(filteredStudents);
      })
      .catch((err) => reject(err));
  });
  return getTAsPromise;
}

export function getCourses() {
  getCoursesPromise = new Promise(function (resolve, reject) {
    if (!checkInitialized(reject)) {
      return;
    }
    if (dataCollection.courses == null || dataCollection.courses.length <= 0) {
      reject("No results returned.");
      return;
    }
    resolve(dataCollection.courses);
  });
  return getCoursesPromise;
}
