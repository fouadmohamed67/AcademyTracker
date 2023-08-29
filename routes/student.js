const express=require('express')
const router=express.Router()
const studentController=require('../controllers/studentController')
const isAuth=require('../middleware/auth');


router.post('/student',isAuth,studentController.createStudent);
router.get('/student',studentController.getStudents);
router.delete('/student',isAuth,studentController.deleteStudent);
router.get('/studentOfTeacher',isAuth,studentController.getStudentsOfTeacher)
router.get('/student/:id',isAuth,studentController.findStudent)
module.exports=router