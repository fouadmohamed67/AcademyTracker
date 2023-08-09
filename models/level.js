const database=require('../connections/database')
class Level{

    constructor({
        id=null,
        levelName
    }){
        this.id=id;
        this.levelName=levelName
    }

   static async createLevel(levelName){
        try{ 
            let [rows,fields]=await database.query("insert into level (levelName) VALUES (?)",
            [levelName])  
            return rows
        }
        catch(error){    
            throw new Error (error.message)
        }
    }
    static async getAllLevels(){
        try{
            let [rows,fields]=await database.execute("select * from level order by level.id");
            return rows
        }
        catch(error){
            throw new Error (error.message) 
        }
    }
    static async find(id){
        try {
            let [rows,fields]=await database.execute("select * from level where id=?",[id]);
            return rows[0]
        } catch (error) {
            throw new Error (error.message)
        }
    }
   static async deleteLevel(id){
        try {
            const result=await database.execute("delete from level where id = ?",[id]);
            return true
        } catch (error) {
            throw new Error (error.message)
        }
    }
    static async studentPerLevel(teacherId){
        try{
            let [rows,fields]=await database.execute("select level.id ,count(student.id) as countStudent from level left outer join student on level.id=student.levelId and student.teacherId=?  group by level.id order by level.id",[teacherId]);
            return rows
        }
        catch(error){
            throw new Error (error.message) 
        }
    }
    static async coursesPerLevel(){
        try{
            let [rows,fields]=await database.execute("select level.id ,count(course.id) as countCourse from level left outer join course on level.id=course.levelId  group by level.id order by level.id");
            return rows
        }
        catch(error){
            throw new Error (error.message) 
        }
    }
}
module.exports=Level