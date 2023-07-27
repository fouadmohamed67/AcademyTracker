const express=require('express')
const router=express.Router()
const studentController=require('../controllers/studentController')
 

router.post('/student',studentController.createStudent);
router.get('/student',studentController.getStudents);
router.delete('/student',studentController.deleteStudent);
router.get('/studentOfTeacher',studentController.getStudentsOfTeacher)
router.get('/student/:id',studentController.findStudent)
module.exports=router