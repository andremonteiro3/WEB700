/*******************************************************************************
 *  WEB700 – Assignment 2
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Andre Hideo Onoda Monteiro Student ID: 101947232 Date: 05/23/2024
 *
 ********************************************************************************/
const collegeData = require("./modules/collegeData");

function testCountResults(func, unit) {
  func()
    .then((results) =>
      console.log("Succsessfully retrieved " + results.length + " " + unit)
    )
    .catch((err) => console.log("ERROR: " + err));
}

collegeData.initialize()
  .then((result) => {
    testCountResults(collegeData.getAllStudents, "students");
    testCountResults(collegeData.getCourses, "courses");
    testCountResults(collegeData.getTAs, "students");
  })
  .catch((err) => console.log("ERROR: " + err));
