const express=require('express')
const router=express.Router()
const courseController=require('../controllers/courseController')
const isAuth=require('../middleware/auth');

router.post('/course',isAuth,courseController.createCourse);
router.get('/course',isAuth,courseController.getCourses);
router.delete('/course',isAuth,courseController.deleteCourse);
router.get('/CoursesOfLevel/:id',isAuth,courseController.getCoursesOfLevel)
////course student
router.post('/registerAtCourse',isAuth,courseController.registerAtCourse)
router.delete('/removeRegistration',isAuth,courseController.removeRegistration)
router.get('/studentCourses/:id',isAuth,courseController.coursesStudentRegistrationInfo)
router.post('/updatRegistration',isAuth,courseController.updateStudentCourse)
module.exports=router