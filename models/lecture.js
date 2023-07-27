const database=require('../connections/database')
class Lecture{
    constructor({
        id=null,
        lectureName,
        pdfURL
    }){
        this.id=id;
        this.lectureName=lectureName;
        this.pdfURL=pdfURL
    }

   static async createLecture(lectureName,pdfURL,courseId){
        try{ 
            let [rows,fields]=await database.query("insert into lecture (lectureName,pdfURL,courseId) VALUES (?,?,?)",
            [lectureName,pdfURL,courseId])  
            return rows
        }
        catch(error){    
            throw new Error (error.message)
        }
    }
    static async getAllLectures(){
        try{
            let [rows,fields]=await database.execute("select * from lecture");
            return rows
        }
        catch(error){
            throw new Error (error.message) 
        }
    }
    static async getAllLecturesCourse(courseId){
        try{
            let [rows,fields]=await database.execute("select * from lecture where courseId=?",[courseId]);
            return rows
        }
        catch(error){
            throw new Error (error.message) 
        }
    } 
    static async find(id){
        try {
            let [rows,fields]=await database.execute("select * from lecture where id=?",[id]);
            return rows[0]
        } catch (error) {
            throw new Error (error.message)
        }
    }
   static async deleteLecture(id){
        try {
            const result=await database.execute("delete from lecture where id = ?",[id]);
            return true
        } catch (error) {
            throw new Error (error.message)
        }
    }


   



}
module.exports=Lecture