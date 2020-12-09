const { request } = require("express");
const express = require("express");

let router = express.Router();



let ROOL_PATH_LISTENING = "/api/accountmanager";

/**
 * GET 
 *  Handle get request.
 *  Send the full data.
 */
router.get(ROOL_PATH_LISTENING, function(req, res){ //get command with request, respond
    console.log(getTime() + " Get command received on " + ROOL_PATH_LISTENING);
    return res.status(200).json(database);
});

/**
 * POST 
 *  Store the received data
 */
router.post(ROOL_PATH_LISTENING, function(req, res){
    console.log(getTime() + " Post command received on " + ROOL_PATH_LISTENING);
    let item = {
        id:id,
        dateAction:req.body.dateAction,
        label:req.body.label,
        amount:req.body.amount,
        dateImpactOnBank:req.body.dateImpactOnBank,
        accountId:req.body.accountId
    }
    console.log(getTime() + " Data to insert :");
    console.log(getTime() + " \tId              : " + item.id);
    console.log(getTime() + " \tDateAction      : " + item.dateAction);
    console.log(getTime() + " \tLabel           : " + item.label);
    console.log(getTime() + " \tAmount          : " + item.amount);
    console.log(getTime() + " \tdateImpactOnBank: " + item.dateImpactOnBank);
    console.log(getTime() + " \taccountId       : " + item.accountId);
    id++;
    database.push(item);
    return res.status(200).json({message:"success"});
});

/**
 * DELETE
 *  Suppress record based on the id
 */
router.delete(ROOL_PATH_LISTENING+"/:id", function(req, res){
    console.log(getTime() + " Delete command received on " + ROOL_PATH_LISTENING);
    console.log(getTime() + " Id to delete: " + req.params.id);
    let id = parseInt(req.params.id, 10);
    let tempDatabase = database.filter(item => item.id !== id);
    database = tempDatabase;
    return res.status(200).json({message:"suppress success"});
});




/**
 * PUT
 *  update of a record based on the id
 */
router.put(ROOL_PATH_LISTENING+"/:id", function(req, res){
    console.log(getTime() + " Put command received on " + ROOL_PATH_LISTENING);
    let tmp_id = parseInt(req.params.id, 10);
    console.log(getTime() + " Id to update : " + tmp_id);
    let item = {
        id:req.body.id,
        dateAction:req.body.dateAction,
        label:req.body.label,
        amount:req.body.amount,
        dateImpactOnBank:req.body.dateImpactOnBank,
        accountId:req.body.accountId
    }
    console.log(getTime() + " Containt of the Update :");
    console.log(getTime() + " \tDateAction      : " + item.dateAction);
    console.log(getTime() + " \tLabel           : " + item.label);
    console.log(getTime() + " \tAmount          : " + item.amount);
    console.log(getTime() + " \tdateImpactOnBank: " + item.dateImpactOnBank);
    console.log(getTime() + " \taccountId       : " + item.accountId);

    for(let i=0; i<database.length; i++) {
        if(database[i].id === tmp_id) {
            database.splice(i, 1, item);
            return res.status(200).json({message:"put success"});
        }
    }
    return res.status(404).json({message:"put not found"});
})
