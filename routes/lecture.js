const express=require('express')
const router=express.Router()
const lectureController=require('../controllers/lectureController')
 

router.post('/lecture',lectureController.createLecture);
router.delete('/lecture',lectureController.deleteLecture);
router.get('/getAllLecturesCourse',lectureController.getAllLecturesCourse)
 module.exports=router