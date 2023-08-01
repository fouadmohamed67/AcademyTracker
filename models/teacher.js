const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const database=require('../connections/database')
 class Teacher{
    constructor({
        id=null,
        firstName,
        lastName,
        email,
        password,
        phoneNumber
    }){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
        this.phoneNumber=phoneNumber
    }

    async save(){
        try {
            let {firstName,lastName,email,password,phoneNumber}=this;
            const hashedPassword=await bcrypt.hash(password,12)
            let [rows,fields]=await database.query("insert into teacher (firstName,lastName,email,password,phoneNumber) values (?,?,?,?,?)",
            [
                firstName,
                lastName,
                email,
                hashedPassword,
                phoneNumber
            ])

            return true
        } catch (error) {
            throw new Error (error.message)
        }
    }

    static async find(searchItem) {
        try {
          let keys = Object.keys(searchItem);
          keys = keys.map((key) => {
            return `${key}=?`;
          }); 
          const values = Object.values(searchItem); 
          const Query = `SELECT * from teacher Where ${keys.toString()}`; 
          let [rows, fields] = await database.execute(Query, values);
          return rows;
        } catch (e) {
          console.log(e);
          return false;
        }
    }
    
    static async findByCredentials(email,password){
        try {
            const result = await this.find({ email }); 
            const teacher = new Teacher({ ...result[0] });
           
            if (!teacher.email) {
              throw new Error("user not found");
            } 
            const isMatch = await bcrypt.compare(password, teacher.password);
            if (!isMatch) {
              throw new Error("wrong password");
            }
            return teacher;  
        } catch (error) {
            throw error
        }
    }

     async generateToken() {
        try {
            const teacher=this; 
            const token=jwt.sign(
                {id:teacher.id.toString()},
            'fo2shaDoksha',
            {expiresIn:'12h'});
            teacher.update({token});
            return token 
        } catch (e) {
          console.log(e);
          throw new Error("can't generate auth token");
        }
      }

      async update(updatedData){
        try {
            let keys = Object.keys(updatedData);
            let passwordIndex = null;
            keys = keys.map((key, index) => {
              if (key === "password") {
                console.log(index);
                passwordIndex = index;
              }
              return `${key}=?`;
            }); 
            const values = Object.values(updatedData);
            if (passwordIndex !== null) {
                values[passwordIndex] = await bcrypt.hash(values[passwordIndex], 8);
            }
            const QUERY = `UPDATE teacher set ${keys.toString()} where id=?`;
            let [rows, fields] = await database.execute(QUERY, [...values, this.id]);
            return true;

        } catch (error) { 
            console.log(error)
            return false 
        }
    }
 
    
 }
 module.exports=Teacher