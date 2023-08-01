const express=require('express')
const router=express.Router()
const lectureController=require('../controllers/lectureController')
const isAuth=require('../middleware/auth');


router.post('/lecture',isAuth,lectureController.createLecture);
router.delete('/lecture',isAuth,lectureController.deleteLecture);
router.get('/getAllLecturesCourse',isAuth,lectureController.getAllLecturesCourse)
 module.exports=router