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

   static async createLecture(lectureName,pdfURL,courseId,teacherId){
        try{ 
            let [rows,fields]=await database.query("insert into lecture (lectureName,pdfURL,courseId,teacherId) VALUES (?,?,?,?)",
            [lectureName,pdfURL,courseId,teacherId])  
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
    static async getAllLecturesCourse(courseId,teacherId){
        try{ 
            let [rows,fields]=await database.execute("select * from lecture where courseId=? and teacherId=?",[courseId,teacherId]);
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
    static async getFile(lectureId){
        try {
            const [rows,values]=await database.execute("select * from lecture where id=?",[lectureId]); 
            const pdfURL=rows[0].pdfURL; 
            return pdfURL
        } catch (error) {
            throw new Error (error.message)
        }
    }
   



}
module.exports=Lecture