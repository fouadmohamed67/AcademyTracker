const Teacher=require('../models/teacher') 
const jwt=require('jsonwebtoken')

const getTeacherInfo = async (req, res) => {
     
   try {
    const token=req.get('Authorization').split(' ')[1];  
    const  decodedToken=jwt.verify(token,'fo2shaDoksha'); 
    let teacher=await Teacher.find({id:decodedToken.id}) ; 
    delete teacher[0].password; 
     const clearedTeacher=teacher[0];
    res.status(200).send({clearedTeacher})
   } catch (error) {
    res.status(400).send({message:error.message})
   }
  }  
module.exports={
    getTeacherInfo 
}