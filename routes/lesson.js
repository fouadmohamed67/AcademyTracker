const express=require('express')
const router=express.Router()
const lessonController=require('../controllers/lessonController')
 

router.post('/lesson',lessonController.createLesson);
router.delete('/lesson',lessonController.deleteLesson);
router.get('/getAllLessonsOf',lessonController.getAllLessonsOf);
router.get('/getAllLessonsOfDate',lessonController.getAllLessonsOfDate);
module.exports=router