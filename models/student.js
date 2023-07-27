const database=require('../connections/database')
class Student{
    constructor({
        id=null,
        firstName,
        lastName,
        age,
        phoneNumber,
        ParentPhoneNumber,
        
    }){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;
        this.phoneNumber=phoneNumber;
        this.ParentPhoneNumber=ParentPhoneNumber; 
    }
   static async addStudent(
    firstName,
    lastName,
    age,
    phoneNumber,
    ParentPhoneNumber,
    teacherId,
    levelId){
        try{ 
            
            let [rows,fields]=await database.query("insert into student (firstName,lastName,age,phoneNumber,ParentPhoneNumber,levelId,teacherId) VALUES (?,?,?,?,?,?,?)",
            [firstName,lastName,age,phoneNumber,ParentPhoneNumber,levelId,teacherId])  
            return rows
        }
        catch(error){    
            console.log(error)
            throw new Error (error.message)
        }
    }

    static async getAllStudents(){
        try{
            let [rows,fields]=await database.execute("select * from student");
            return rows
        }
        catch(error){
            throw new Error (error.message) 
        }
    }
    
    static async getAllStudentsOfTeacher(teacherId){
        try{
            let [rows,fields]=await database.execute("select * from student where teacherId=?",[teacherId]);
            return rows
        }
        catch(error){
            throw new Error (error.message) 
        }
    }

    static async find(id){
        try {
            let [rows,fields]=await database.execute("select * from student where id=?",[id]);
            return rows[0]
        } catch (error) {
            throw new Error (error.message)
        }
    }

   static async deleteStudent(id){
        try {
            const result=await database.execute("delete from student where id = ?",[id]);
            return true
        } catch (error) {
            throw new Error (error.message)
        }
    }
}
module.exports=Student