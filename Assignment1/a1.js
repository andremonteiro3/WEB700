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
    while (true){
        randomRequest();
        setInterval(1000);
    }

    
}


console.log(httpRequest("GET","/"));
console.log(httpRequest("GET","/about"));
console.log(httpRequest("GET","/contact"));
console.log(httpRequest("POST","/login"));
console.log(httpRequest("GET","/panel"));
console.log(httpRequest("POST","/logout"));
console.log(httpRequest("GET","/logout"));
