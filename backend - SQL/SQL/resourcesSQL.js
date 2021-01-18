/**
 * This file will create the databases if requered.
 * 
 */


/**
 * CreateTable
 *  will create all talbes for the application.
 *  @param con : connection to the database (from mysql.createConnection)
 *  @returns true if correctly executed.
 */

export default function CreateTable(con){
//function CreateTable(con){

    let sql = "CREATE TABLE IF NOT EXISTS users ( "
                    + "id INT AUTO_INCREMENT PRIMARY KEY, " 
                    + "username VARCHAR(50) UNIQUE, "
                    + "password VARCHAR(256), "
                    + "email varchar(256) "
                + ");";
    query_ok = ExecQuery(con, sql);

    if(query_ok) {
        sql = "CREATE TABLE IF NOT EXISTS sessions ( "
                    "id INT AUTO_INCREMENT PRIMARY KEY, " 
                    "token VARCHAR(128), "
                    "ttl BIGINT, "
                    "user VARCHAR(50)"
                ");";
        query_ok = ExecQuery(con, sql);	
    }
    
    if(query_ok) {
        sql = "CREATE TABLE IF NOT EXISTS account ( "
                    "id INT AUTO_INCREMENT PRIMARY KEY, "
                    "idAccountOwner INT, "
                    "lable VARCHAR(80), "
                    "amountConsolidated DECIMAL(5,2), "
                    "consolidationDate DATE, "
                    "available DECIMAL(5,2)"
                    "pending DECIMAL(5,2)"
                    "privilege varchar"
                    "idUser INT"
                ");";
        query_ok = ExecQuery(con, sql);
    }
}

/**
 * createTable
 *  will execute the query.
 *  @param con : connection to the database (from mysql.createConnection)
 *  @param sql : string contening the sql request
 *  @returns true if correctly executed.
 */
function ExecQuery(con, sql){
    con.query(sql, function(err,result) {
		if(err) {
			console.log("Failed to create table users!");
            throw err;
            return false;
		}
		console.log("Query executed ",result);
    })
    return true;
}
