const Lesson=require('../models/lesson'); 
const Course=require('../models/course')
const  createLesson=async(req,res)=>{
    try { 
        const date=req.body.date;
        const price= req.body.price;
        const paied=req.body.paied; 
        const lectureId=req.body.lectureId;
        const studentId= req.body.studentId;
        const TeacherId=req.body.TeacherId;   
        const lesson=await Lesson.createLesson(date,price,paied,lectureId,studentId,TeacherId);
        res.status(201).send({ lesson }); 
    } catch (error) {  
        res.status(409).send({ message:error.message }); 
    }
} 
const deleteLesson= async (req, res) => {
     try { 
      const id=req.query.id;
      const lesson= await Lesson.find(id)
      if(lesson){ 
        await Lesson.deleteLesson(id); 
        res.status(201).send({ message:"lesson deleted" });
      } 
      else{
        throw new Error('lesson already deleted')
      }
     } catch (error) {
      res.status(409).send({ message:error.message });
     }
}; 
const getAllLessonsOf= async(req,res)=>{
    try {
          
        const lectures=await Lesson.getAllLessonsOf(req.body)
        res.status(201).send({ lectures });
      } catch (error) {
        res.status(409).send({ message:error.message }); 
      }
}
const getAllLessonsOfDate=async (req,res)=>{
  try {
      const date=req.query.date;
      const teacherId=req.query.teacherId;
      
     const lessons= await Lesson.getAllLessonsOfDay(date,teacherId)
    
      res.status(201).send({ lessons });
  } catch (error) {
    res.status(409).send({ message:error.message }); 
  }
} 
const generateDailyLessons=async()=>{
   try {
    const appointmentsOfToday=await Course.appointmentsOfToday();
    console.log(appointmentsOfToday)
    const date = new Date(); 
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();  
    let currentDate = `${year}-${month}-${day}`;  
    for(let i=0;i<appointmentsOfToday.length;i++)
    { 
       let DayTime= currentDate+' '+appointmentsOfToday[i].appointment 
       await Lesson.createLesson(DayTime,0,0,null,appointmentsOfToday[i].teacherId,appointmentsOfToday[i].courseStudentId) 
    } 
   } catch (error) {
      console.log(error)
   }
}
const findLessonAndUpdate=async(req,res)=>{
  try {
      const id=req.body.id
      const data=req.body.data 
      await Lesson.findLessonAndUpdate(id,data);
      res.status(201).send({ message:"success update" });
  } catch (error) {
    res.status(409).send({ message:error.message }); 
  }
}
module.exports={
    createLesson,
    deleteLesson, 
    getAllLessonsOf,
    getAllLessonsOfDate,
    generateDailyLessons,
    findLessonAndUpdate
}