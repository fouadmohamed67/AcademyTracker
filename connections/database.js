const mysql=require("mysql2/promise")
let connection;
try {
        connection=mysql.createPool({
            host:"localhost",
            user:"root",
            password:"root",
            database:"school"
        })
        console.log('connected')
} catch (error) {
    console.log(error)
}
module.exports=connection