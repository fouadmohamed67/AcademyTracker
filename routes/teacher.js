const express=require('express')
const router=express.Router()
const teacherController=require('../controllers/teacherController')
 

 router.get('/teacher',teacherController.getTeacherInfo); 
module.exports=router