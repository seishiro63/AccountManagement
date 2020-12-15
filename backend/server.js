
/**
 * Includes
 */
const express = require("express");
const bodyParser = require("body-parser");

//all routes for the application : 
const apiroutes = require("./routes/apiroutes"); 


//crypto : 
const crypto = require('crypto');
const secret = 'Hac in hora Sine mora Corde pulsum tangite Quod per sortem Sternit forterm Mecum omnes plangite'
const algorithm = 'sha256';




/**
 * Globales values
 */
const LISTENING_PORT = 3101;
//const PASSWORD_MIN_LENGTH = 4;
//const LOGIN_MIN_LENGTH = 4;

//session stuff:
const ttl_diff = 36000000; //ttl = time to live (how long the session will stay) - here 1h



/**
 * Temporary - removed when the DB will be live
 */
let id = 100; //start of index

//Databases
let registeredUsers = [];   //list of users available for the application
let loggedSession = [];     //array of live sessions.   

let databaseHome = [];          //list of data for home


let app = express(); //initialise
app.use(bodyParser.json());






/**
 * MIDDLEWARE
 */
//Generate hash for encryption
function getHash(key) {
    const hash = crypto.createHmac(algorithm, secret)
                       //.createHash("sha256")
                       .update(key)
                       .digest('hex');
    crypto.createHash("sha256").update(key).digest("hex");
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

isSessionExist = (user) => {
    if (loggedSession.length>0){
        if(user.login){
            for(let i=0; i<loggedSession.length; i++) {
                if(user.login === loggedSession[i].login) {
                    return true;
                }
            }
        }
    }
    return false;
}

isUserLogged = (req, res, next) => {
    if(!req.headers.token) {
        return res.status(403).json({message:"forbidden"});
    }
    //checking the sessions:
    for(let i=0; i<loggedSession.length; i++) {
        //if I found the token
        if(req.headers.token === loggedSession[i].token) {
            let now = Date.now();
            //if the session is timed out
            if(now > loggedSession[i].ttl) {
                loggedSession.splice(i, 1);
                return res.status(403).json({message:"forbidden"});
            }
            loggedSession[i].ttl = now + ttl_diff;

            req.session = {};
            req.session.login = loggedSession[i].login;
            return next();
        }
    }
    //didn't find anything:
    return res.status(403).json({message:"forbidden"});

    /* IMPORTANT
        the 403 error are important to reset the frontend.
        Otherways the user can be blocked with an invalid key.
    */
}





/**
 * FUNCTIONS
 */

/**
 * checkRequestCorps
 * 
 *  The function will check :
 *      - if the body is present
 *      - if the login is present and respect the minimum length
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
    if(!req.body.password || !req.body.login){
        if (!req.body.login) message="No login ";
        if(!req.body.password) message="No password";
        returnObj.flgIsChkOk = false;
        returnObj.errorMsg = "ERROR parameter incorect in req: " + message;
        return returnObj;
    }
    
    /*
    //checking size of password and login
    if(req.body.password.length < PASSWORD_MIN_LENGTH || req.body.login.length < LOGIN_MIN_LENGTH){
        if (req.body.password.length < PASSWORD_MIN_LENGTH) message = "Password length insufficient ";
        if (req.body.login.length < LOGIN_MIN_LENGTH) message = "Username length insufficient ";
        returnObj.flgIsChkOk = false;
        returnObj.errorMsg = "ERROR parameter incorect in req: " + message;
        return returnObj;
    }
    */
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

    //check if the login is available
    for(let i=0; i<registeredUsers.length; i++) {
        if(req.body.login === registeredUsers[i].login) {
            console.error("REGISTER ERROR Registration failed : " + req.body.login + " is already exist");
            return res.status(409).json({message:"Bad request : " + req.body.login + " is already exist"});
        }
    }

    //Generating Hash form password and storing it.
    myHash = getHash(req.body.password);
    console.log("REGISTER hash genetared: " + myHash);
    let user = {
        login:req.body.login,
        password:myHash,
        email:req.body.email
    }
    registeredUsers.push(user);
    console.log("REGISTER Registration of new user " + user.login);
    console.log("REGISTER Done");
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
        console.error("LOGIN " + testRes.errorMsg);
        return res.status(400).json({message:"Bad Request"});
    }
    
    //limit the number of session to one.
    for(let i=0; i<registeredUsers.length; i++) {
        if(registeredUsers[i].login === req.body.login){
            console.log("LOGIN Session existing for user " + req.body.login + " => previous session removed.");
            loggedSession.splice(i, 1);
        }
    }

    //Creating user session
    console.log("LOGIN Login requested for user: " + req.body.login);
    for(let i=0; i<registeredUsers.length; i++) {
        if(registeredUsers[i].login === req.body.login) {
            console.log("LOGIN User "+  req.body.login +" is available for the application");
            myHash=getHash(req.body.password);
            //console.log("LOGIN : hash stored for the user : " + registeredUsers[i].password);
            //console.log("LOGIN : hash generated form pwd  : " + myHash);
            if(myHash.localeCompare(registeredUsers[i].password) === 0){
                console.log("LOGIN password confirmed");
                let token = createToken();
                let now = Date.now();
                let session = {
                    login: req.body.login,
                    ttl: now + ttl_diff,
                    token: token
                }
                loggedSession.push(session);
                console.log("LOGIN session created : " + token);
                console.log("LOGIN Done");
                return res.status(200).json({token:token});
            }
            else {
                console.error("LOGIN ERROR : authentication error");
                return res.status(403).json({message:"forbidden"});
            }
        }
        
        console.error("LOGIN ERROR User don't exist in appilcation.")
        return res.status(403).json({message:"forbidden"});
    } 
});



/**
 * - LOGOUT -  
 *      Closing session
 */
app.post("/logout", function(req, res) {
    console.log("LOGOUT requested")
    if(loggedSession.length>0){
        
        //Basic parameter check of the request (set in function)
        /* => if not commented requere passord to disconnect
        even if there is no pwd check....
        let testRes = checkRequestCorps(req);
        if(!testRes.flgIsChkOk){
            console.error("REGISTER " + testRes.errorMsg);
            return res.status(400).json({message:"Bad Request"});
        }
        */
        if(!req.headers.token){
            console.error("LOGOUT ERROR No token sent in the requet");
            return res.status(404).json({message:"nout found"});
        }
        for(let i=0; i<loggedSession.length; i++) {
            if(loggedSession[i].token === req.headers.token) {
                console.log("LOGOUT user: " + loggedSession[i].login);
                loggedSession.splice(i, 1);
                console.log("LOGOUT Done");
                return res.status(200).json({message:"success"});
            }
        }   
        console.error("LOGOUT ERROR Session not found for token: " + req.headers.token);
        return res.status(404).json({message:"not found"});
    }
    else {
        console.error("LOGOUT ERROR No user connected to the application");
        return res.status(404).json({message:"not found"});
    }
});


//using the routes if the user is connected: 
app.use("/api", isUserLogged, apiroutes);

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































/*
 * Création d'un jeu de donnée:
 */


// Auth : 


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