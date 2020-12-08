
/**
 * Includes
 */
const express = require("express");
const bodyParser = require("body-parser");

//const apiroutes = require("./routes/apiroutes"); //all routes for the application

const crypto = require('crypto');
//const secret = 'thisissecret';
const secret = 'Hac in hora Sine mora Corde pulsum tangite Quod per sortem Sternit forterm Mecum omnes plangite'
const algorithm = 'sha256';

/**
 * Globales values
 */
let LISTENING_PORT = 3101;
let PASSWORD_MIN_LENGTH = 14;
let EMAIL_MIN_LENGTH = 5;

//session stuff:
const ttl_diff = 36000000; //ttl = time to live (how long the session will stay) - here 1h


let id = 100;

let app = express(); //initialise

app.use(bodyParser.json());




/**
 * DATABASES
 */
let database = [];          //list of data
let registeredUsers = [];   //list of users available for the application
let loggedSession = [];     //array of live sessions.   





/**
 * MIDDLEWARE
 */
//Generate hash for encryption
function getHash(text) {
    const hash = crypto.createHmac(algorithm, secret)
    .update(text)
    .digest('hex');
    return hash;
}

createToken = () => {
    let token = "";
    let letters = "ABCDEFGHIJabcdefghij0123456789" //no car used in URL
    for (let i=0; i<256; i++) {
        let temp = Math.floor(Math.random()*letters.length);
        token = token + letters[temp];
    }
    return token;
}



/**
 * FUNCTIONS
 */

/**
 * checkRequestCorps
 * 
 *  The function will check :
 *      - if the body is present
 *      - if the email is present and respect the minimum length
 *      - if the password is present and respect the minimum length
 * 
 * @param req : the request received
 * @return obj : return an object with:
 *          flgIsChkOk: boolean if the check is ok.
 *          errorMsg : error message if the check is incorect
 */
function checkRequestCorps(req) {
    //Object returned by the function
    let returnObj = {
            flgIsChkOk:true,
            errorMsg:""
        }
    
    var message = ""; //variable used to create adaptative message

    //check if data is legit:
    if(!req.body) { 
        returnObj.flgIsChkOk = false;
        errorMsg = "ERROR No body in request";
        return returnObj;
    }

    //if request is incomplete:
    if(!req.body.password || !req.body.email){
        if (!req.body.email) message="No email ";
        if(!req.body.password) message="No password";
        returnObj.flgIsChkOk = false;
        returnObj.errorMsg = "ERROR parameter incorect in req: " + message;
        return returnObj;
    }
    
    //checking size of password and email
    if(req.body.password.length < PASSWORD_MIN_LENGTH || req.body.email.length < EMAIL_MIN_LENGTH){
        if (req.body.password.length < PASSWORD_MIN_LENGTH) message = "Password length insufficient ";
        if (req.body.email.length < EMAIL_MIN_LENGTH) message = "Username length insufficient ";
        returnObj.flgIsChkOk = false;
        returnObj.errorMsg = "ERROR parameter incorect in req: " + message;
        return returnObj;
    }

    return returnObj;
}













/**
 * HANDELING AUTHENTIFICATION
 */

/**
 * - REGISTER - 
 *      Creating new user 
 */
app.post("/register", function(req, res) {
    console.log("REGISTER request to create a new user.");

    //Basic parameter check of the request (set in function)
    let testRes = checkRequestCorps(req);
    if(!testRes.flgIsChkOk){
        console.error("REGISTER " + testRes.errorMsg);
        return res.status(400).json({message:"Bad Request"});
    }

    //check if the email is available
    for(let i=0; i<registeredUsers.length; i++) {
        if(req.body.email === registeredUsers[i].email) {
            console.error("REGISTER ERROR Registration failed : Username is already use");
            return res.status(409).json({message:"Bad request : Username is already use"});
        }
    }

    //Generating Hash form password and storing it.
    myHash = getHash(req.body.password);
    console.log("REGISTER hash genetared: " + myHash);
    let user = {
        email:req.body.email,
        password:myHash
    }
    registeredUsers.push(user);
    console.log("REGISTER Registration of new user " + user.email + " succeed");
    return res.status(200).json({message:"success"});     
});


/**
 * - LOGIN -  
 *      Session creation
 */
app.post("/login", function(req, res) {
    console.log("LOGIN requested");
    //Basic parameter check of the request (set in function)
    let testRes = checkRequestCorps(req);
    if(!testRes.flgIsChkOk){
        console.error("REGISTER " + testRes.errorMsg);
        return res.status(400).json({message:"Bad Request"});
    }

    console.log("LOGIN Login requested for " + req.body.email);

    for(let i=0; i<registeredUsers.length; i++) {
        if(registeredUsers[i].email === req.body.email) {
            console.log("LOGIN User "+  req.body.email +" is available for the application");
            myHash=getHash(req.body.password);
            //console.log("LOGIN : hash stored for the user : " + registeredUsers[i].password);
            //console.log("LOGIN : hash generated form pwd  : " + myHash);
            if(myHash.localeCompare(registeredUsers[i].password) === 0){
                console.log("LOGIN password confirmed");
                let token = createToken();
                let now = Date.now();
                let session = {
                    email: req.body.email,
                    ttl: now + ttl_diff,
                    token: token
                }
                loggedSession.push(session);
                console.log("LOGIN session created : " + token);
                return res.status(200).json({token:token});
            }
            else {
                console.error("LOGIN ERROR : authentication error");
                return res.status(403).json({message:"forbidden"});
            }
        }
        console.error("LOGIN ERROR User don't exist in appilcation.")
        return res.status(401).json({message:"User unauthorized"});
    }
    return res.status(403).json({message:"forbidden"});
});



/**
 * - LOGOUT -  
 *      Closing session
 */
app.post("/logout", function(req, res) {
    console.log("LOGOUT requested")
    if(!req.headers.token){
        console.error("LOGOUT ERROR No token sent in the requet");
        return res.status(404).json({message:"nout found"});
    }
    if(registeredUsers.length>0){
        for(let i=0; i<registeredUsers.length; i++) {
            if(loggedSession[i].token === req.headers.token) {
                console.log("LOGOUT user : " + loggedSession[i].email);
                loggedSession.splice(i, 1);
                return res.status(200).json({message:"success"});
            }
        }
    }
    else{
        console.error("LOGOUT ERROR No user registred for the application !!");
        return res.status(404).json({message:"not found"});
    }
    console.error("LOGOUT ERROR Session not found for token: " + req.header.token);
    return res.status(404).json({message:"not found"});
});





/**
 * Start listening
 */
app.listen(LISTENING_PORT);
console.log("Running on port " + LISTENING_PORT);


/**
 * Install moduls : 
 * npm i aesjs
 */

/* running the server : 
 *  node server 
 * in the right directory
 */


 /*************************************/
































console.log("Inserting data for tests");
/*
 * Création d'un jeu de donnée:
 */
/*
function getTime() { 
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    return dateTime;
}

let item1 = {
    id:1,
    dateAction:getTime(),
    label:"K Market",
    amount:100,
    dateImpactOnBank:0,
    accountId:0
}
database.push(item1);

let item2 = {
    id:2,
    dateAction:getTime(),
    label:"Lidl",
    amount:95.87,
    dateImpactOnBank:0,
    accountId:0
}
database.push(item2);

let item3 = {
    id:3,
    dateAction:getTime(),
    label:"Norauto",
    amount:465.56,
    dateImpactOnBank:0,
    accountId:0
}
database.push(item3);
*/
console.log("Insert done");