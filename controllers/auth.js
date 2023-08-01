const Teacher=require('../models/teacher') 
const jwt=require('jsonwebtoken')

const signup = async (req, res) => {
    try { 
      const checkTeacher=await Teacher.find({email:req.body.email});
     
      if(checkTeacher[0])
      {
        throw new Error('email in use')
      }
      const teacher = new Teacher(req.body); 
      await teacher.save();
      res.status(201).send({ teacher });
    } catch (e) {
      console.log(e);
      res.status(409).send({ message: e.message });
    }
  }

const login=async(req,res)=>{
    try {
        const teacher=await Teacher.findByCredentials(
            req.body.email,
            req.body.password
        )     
        if(teacher)
        { 
           const token=await teacher.generateToken()
            res.status(200).send({teacherid:teacher.id,token});
        }
        else {
            throw new Error("email or password not correct");
          }
    } catch (error) {
        
        res.status(400).send({message:error.message})
    }
}

const stillLogin=async(req,res)=>{ 
  try { 
      const token=req.get('Authorization').split(' ')[1];  
      const  decodedToken=jwt.verify(token,'fo2shaDoksha'); 
      const teacher=await Teacher.find({id:decodedToken.id}); 
     if(!teacher)
     {
      throw new Error("this user not authorized");
     } 
     res.json({message:'valid token',status:200})
  } catch (error) {
   
      res.json({ message: "this user is un authorized",status:401 });
  }  
 
}
module.exports={
    signup,
    login,
    stillLogin
}