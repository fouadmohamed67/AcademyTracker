const Lesson=require('../models/lesson'); 
const  createLesson=async(req,res)=>{
    try { 
        const date=req.body.date;
        const price= req.body.price;
        const paied=req.body.paied; 
        const lectureId=req.body.lectureId;
        const studentId= req.body.studentId;
        const TeacherId=req.body.TeacherId;   
        const lecture=await Lesson.createLesson(date,price,paied,lectureId,studentId,TeacherId);
        res.status(201).send({ lecture }); 
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
      const date=req.body.date;
     const lessons= await Lesson.getAllLessonsOfDay(date)
      res.status(201).send({ lessons });
  } catch (error) {
    res.status(409).send({ message:error.message }); 
  }
} 
module.exports={
    createLesson,
    deleteLesson, 
    getAllLessonsOf,
    getAllLessonsOfDate 
}