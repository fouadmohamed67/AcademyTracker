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

   static async createLesson(Date,price,paied,lectureId,teacherId,courseStudentId){
        try{ 
            let [rows,fields]=await database.query("insert into lesson (Date,price,paied,lectureId,teacherId,courseStudentId) VALUES (?,?,?,?,?,?)",
            [Date,price,paied,lectureId,teacherId,courseStudentId])  
            return rows
        }
        catch(error){   
            console.log(error) 
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
    static async getAllLessonsOfDay(date,teacherId){ 
        try {
           
            const formatedDate=new Date(date) 
            const Query = "SELECT *,lesson.id as lessonId from lesson inner join student_course,student,course Where student_course.id=lesson.courseStudentId and student.id=student_course.studentId and course.id=student_course.courseId and   date(Date) = ? and lesson.teacherId=?"; 
            let [rows, fields] = await database.execute(Query, [formatedDate,teacherId]);
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
    static async findLessonAndUpdate(id,updatedData){
        try {
            
            let keys = Object.keys(updatedData);
            keys = keys.map((key, index) => { 
                return `${key}=?`;
            }); 
            const values = Object.values(updatedData);
            const QUERY = `UPDATE lesson set ${keys.toString()} where id=?`;
            let [rows, fields] = await database.execute(QUERY, [...values, id]);
            return true;
        } catch (error) {
            
            throw new Error("cant update lesson");
        }
    }

    

}
module.exports=Lesson