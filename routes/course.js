const express=require('express')
const router=express.Router()
const courseController=require('../controllers/courseController')
 

router.post('/course',courseController.createCourse);
router.get('/course',courseController.getCourses);
router.delete('/course',courseController.deleteCourse)
////course student
router.post('/registerAtCourse',courseController.registerAtCourse)
router.delete('/removeRegistration',courseController.removeRegistration)
router.get('/studentCourses',courseController.coursesStudentRegistrationInfo)
router.post('/updatRegistration',courseController.updateStudentCourse)
module.exports=router