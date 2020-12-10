const { request } = require("express");
const express = require("express");

let router = express.Router();


/**
 * DATABASE
 */
let databaseAccount = [];
let idAccount = 100;
/* structure : 
    id
    label
    amountConsolidated
    consolidationDate
    available
    pending
    privilege
    login
*/ 




/**
 * Post home
 *  Create account for a user
 */
router.post("/accountlist", function(req, res){
    console.log("Post command received on /accountlist");
    let account = {
        id: idAccount,
        label: req.body.label,
        amountConsolidated: req.body.amountConsolidated,
        login: req.session.login
    }
    idAccount++;
    databaseAccount.push(account);
    return res.status(200).json({message:"success"});
});


/**
 * GET home
 *  Return summary of accounts for the logged user
 */
router.get("/account", function(req, res){ //get command with request, respond
    console.log("GET ACCOUNT Get command received on /api/account , sending list of account for user: " + req.session.login);
    let tempDatabase = databaseAccount.filter(item => item.login === req.session.login)
    console.log("GER ACCOUNT Done");
    return res.status(200).json(tempDatabase);
});










//Export route for navigation.
module.exports = router;














/**
 * For DEV :
 *  Adding fake account for tests
 */

let account1 = {
    id: idAccount,
    label: "My CB account",
    amountConsolidated: 735.43,
    consolidationDate:"30/11/2020",
    available:212.18,
    pending: 523.25,
    privilege:"owner",
    login:"test"
}
idAccount++;
databaseAccount.push(account1);

let account2 = {
    id: idAccount,
    label: "saving",
    amountConsolidated: 735.43,
    consolidationDate:"30/11/2020",
    available: 2000.00,
    pending: 0.00,
    privilege: "owner",
    login:"test"
}
idAccount++;
databaseAccount.push(account2);

//case of proxy account (derogation)
let account3 = {
    id: idAccount,
    label: "CC of my lovely wife",
    amountConsolidated: 3000.00,
    consolidationDate:"30/11/2020",
    available: 3000.00,
    pending: 0.00,
    privilege: "proxy",
    login:"test"
}
idAccount++;
databaseAccount.push(account3);

//case of proxy account (derogation)
let account4 = {
    id: idAccount,
    label: "CC of my lovely wife",
    amountConsolidated: 3000.00,
    consolidationDate:"30/11/2020",
    available: 2743.79,
    pending: 256.21,
    privilege: "Owner",
    login:"Titi"
}
idAccount++;
databaseAccount.push(account4);