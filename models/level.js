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
            let [rows,fields]=await database.execute("select * from level");
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
}
module.exports=Level