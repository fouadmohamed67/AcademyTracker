const database=require('../connections/database')
class Lesson{
    constructor({
        id=null,
        Date,
        price,
        paied
    }){
        this.id=id;
        this.Date=Date;
        this.price=price;
        this.paied=paied;
    }

   static async createLesson(Date,price,paied,lectureId,studentId,teacherId){
        try{ 
            let [rows,fields]=await database.query("insert into lesson (Date,price,paied,lectureId,studentId,teacherId) VALUES (?,?,?,?,?,?)",
            [Date,price,paied,lectureId,studentId,teacherId])  
            return rows
        }
        catch(error){    
            throw new Error (error.message)
        }
    }
    static async getAllLessonsOf(searchItem){ 
        try {
            let keys = Object.keys(searchItem);
            keys = keys.map((key) => {
                if(key==Date){return key}
              return `${key}=?`;
            });  
            const strK=keys.toString();  
            const replaced=strK.replaceAll(","," and "); 
            const values = Object.values(searchItem); 
            const Query = `SELECT * from lesson Where ${replaced}`; 
            let [rows, fields] = await database.execute(Query, values);
            return rows;
          } catch (e) {  
            return false;
          }
    } 
    static async getAllLessonsOfDay(date){ 
        try {
           
            const Query = `SELECT * from lesson Where Date(Date)=?`; 
            let [rows, fields] = await database.execute(Query, [date]);
            return rows;
          } catch (e) {  

            return e.message;
          }
    } 
    static async find(id){
        try {
            let [rows,fields]=await database.execute("select * from lesson where id=?",[id]);
            return rows[0]
        } catch (error) {
            throw new Error (error.message)
        }
    }
   static async deleteLesson(id){
        try {
            const result=await database.execute("delete from lesson where id = ?",[id]);
            return true
        } catch (error) {
            throw new Error (error.message)
        }
    }  

}
module.exports=Lesson