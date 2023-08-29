const express=require('express')
const router=express.Router()
const lessonController=require('../controllers/lessonController')
const isAuth=require('../middleware/auth');


router.post('/lesson',isAuth,lessonController.createLesson);
router.delete('/lesson',isAuth,lessonController.deleteLesson);
router.get('/getAllLessonsOf',isAuth,lessonController.getAllLessonsOf);
router.get('/getAllLessonsOfDate',isAuth,lessonController.getAllLessonsOfDate);
router.post('/findLessonAndUpdate',isAuth,lessonController.findLessonAndUpdate)
module.exports=router