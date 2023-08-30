const mysql=require("mysql2/promise")
let connection;
try {
    connection=mysql.createPool({
        host:"sql.freedb.tech",//sql.freedb.tech
        user:"freedb_fouad",//freedb_fouad
        password:"QV4jPdKnHd3?qMQ",//QV4jPdKnHd3?qMQ
        database:"freedb_acadmyTracker"//freedb_acadmyTracker
    })
        console.log('connected')
} catch (error) {
    console.log('not connected')
    console.log(error)
}
module.exports=connection