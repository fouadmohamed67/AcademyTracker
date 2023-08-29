const express=require('express')
const router=express.Router()
const teacherController=require('../controllers/teacherController')
const isAuth=require('../middleware/auth');


router.get('/teacher',isAuth,teacherController.getTeacherInfo);  
module.exports=router