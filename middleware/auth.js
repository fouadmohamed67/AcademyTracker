const Teacher =require('../models/teacher')
const jwt=require('jsonwebtoken') 
const isAuth=async (req,res,next)=>{  

    try { 
        const token=req.get('Authorization').split(' ')[1]; 
        const  decodedToken=jwt.verify(token,'fo2shaDoksha');
        const teacher=Teacher.find({id:decodedToken.id});
       if(!teacher[0])
       {
        throw new Error("this user not authorized");
       } 
       req.teacherId=decodedToken.id
       next();
    } catch (error) {
        res.json({ message: "this user is un authorized",status:401 });
    } 
} 
module.exports=[
    isAuth
]