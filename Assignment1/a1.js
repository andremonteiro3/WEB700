/*******************************************************************************
*  WEB700 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Andre Hideo Onoda Monteiro Student ID: 101947232 Date: 05/23/2024
*
********************************************************************************/ 

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var serverVerbs = ["GET","GET","GET","POST","GET","POST"];
var serverPaths = ["/","/about","/contact","/login","/panel","/logout"];
var serverResponses = ["Welcome to WEB700 Assignment 1",
                        "This course name is WEB700. This assignment was prepared by Andre Hideo Onoda Monteiro",
                        "amonteiro3@myseneca.ca Andre Hideo Onoda Monteiro",
                        "Hello, User Logged In",
                        "Main Panel",
                        "Logout Complete. Goodbye"];
function httpRequest(httpVerb, path) {
    for (let idx = 0; idx < serverVerbs.length; idx++){
        if (serverVerbs[idx] === httpVerb && serverPaths[idx] === path) {
            return "200: " + serverResponses[idx];
        }
    }
    return "404: Unable to process " + httpVerb + " request for " + path;
}

var testVerbs = ["GET","POST"];
var testPaths = ["/","/about","/contact","/login","/panel","/logout","/randomPath1","/randomPath2"];

function automateTests(){
    function randomRequest() {
        let randVerb = testVerbs[getRandomInt(testVerbs.length - 1)];
        let randPath = testPaths[getRandomInt(testPaths.length - 1)];
        console.log(httpRequest(randVerb,randPath));
    }
    setInterval(randomRequest,1000);
}

automateTests();