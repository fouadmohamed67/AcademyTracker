const database=require('../connections/database')
class Course{
    constructor({
        id=null,
        courseName
    }){
        this.id=id;
        this.courseName=courseName
    }

   static async createCourse(courseName,levelId){
        try{ 
            let [rows,fields]=await database.query("insert into course (courseName,levelId) VALUES (?,?)",
            [courseName,levelId])  
            return rows
        }
        catch(error){    
            throw new Error (error.message)
        }
    }
    static async getAllCourses(){
        try{
            let [rows,fields]=await database.execute("select course.id,course.courseName,level.id as levelId,level.levelName from course,level where course.levelId=level.id");
            return rows
        }
        catch(error){
            throw new Error (error.message) 
        }
    }
    static async find(id){
        try {
            let [rows,fields]=await database.execute("select *,level.levelName from course,level where course.levelId=level.id and course.id=?",[id]);
            return rows[0]
        } catch (error) {
            throw new Error (error.message)
        }
    }
   static async deleteCourse(id){
        try {
            console.log(id)
            const result=await database.execute("delete from course where id = ?",[id]);
            return true
        } catch (error) {
            console.log(error)
            throw new Error (error.message)
        }
    }
    static async getCoursesOfLevel(id){
        try {
            
            let [rows,fields]=await database.execute("select *  from course where levelId = ?",[id]);
            return rows
        } catch (error) {
            console.log(error)
            throw new Error (error.message)
        }
    }


    /////////////////////student Course
    static async registerAtCourse(studentId,courseId,day,appointment){
        try {
            let [rows,fields]=await database.query("insert into student_course (studentId,courseId,day,appointment) VALUES (?,?,?,?)",
            [studentId,courseId,day,appointment])  
            return true
        } catch (error) {
            throw new Error (error.message)
        }
    }
    static async findStudent_course(id){
        try {
            let [rows,fields]=await database.execute("select * from student_course where id=?",[id]);
            return rows[0]
             
        } catch (error) {
            throw new Error (error.message)
        }
    }
    static async findStudentCourseAndUpdate(id,updatedData){
        try {
            let keys = Object.keys(updatedData);
            keys = keys.map((key, index) => { 
                return `${key}=?`;
            }); 
            const values = Object.values(updatedData);
            const QUERY = `UPDATE student_course set ${keys.toString()} where id=?`;
            let [rows, fields] = await database.execute(QUERY, [...values, id]);
            return true;
        } catch (error) {
            console.log(error)
            throw new Error("cant update student_course");
        }
    }
    static async removeRegistration(id){
        try {
            const result=await database.execute("delete from student_course where id = ?",[id]);
            return true
        } catch (error) {
            throw new Error (error.message)
        }
    }
    static async coursesStudentRegistrationInfo(id){
        try{ 
            let [rows,fields]=await database.execute("select * from student ,course,level inner join student_course where student.id=student_course.studentId and level.id=student.levelId and course.id=student_course.courseId and student.id=?",[id]);
            
            return rows 
        }
        catch(error){
            throw new Error (error.message) 
        }
    } 
    static async getStudentsPerDay(teacherId){
        try{ 
            let [rows,fields]=await database.execute("SELECT day,count(*) as num  FROM school.student_course inner join student  where student.teacherId=? and student.id=student_course.studentId  group by(day)  order by(day) ",[teacherId]);
            
            return rows 
        }
        catch(error){
            throw new Error (error.message) 
        }
    }
    static async getNumLessonsOfDay(teacherId){
        try {
            let [rows,fields]=await database.execute("SELECT count(*) as num FROM school.student_course inner join student  where student.teacherId=? and student.id=student_course.studentId  and dayofweek(current_timestamp())=school.student_course.day ",[teacherId])
            return rows
        } catch (error) {
            throw new Error (error.message) 
        }
    }
    static async nextStudent(teacherId){
        try {
            let [rows,fields]=await database.execute("SELECT * FROM school.student_course inner join student ,level where student.teacherId=? and student.id=student_course.studentId and student.levelId=level.id and dayofweek(current_timestamp())=school.student_course.day and appointment >= current_time() order by(appointment)",[teacherId])
            return rows[0]
        } catch (error) {
            throw new Error (error.message) 
        }
    }

    static async appointmentForWeek(teacherId){
        try {
            let [rows,fields]=await database.execute("SELECT * FROM  student_course inner join student,level where student_course.studentId =student.id and level.id=student.levelId and  student.teacherId=?  order by day , appointment ",[teacherId])
            return rows 
        } catch (error) {
            throw new Error (error.message) 
        }
    }




}
module.exports=Course