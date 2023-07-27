const Lecture=require('../models/lecture')
const multer=require('multer')
const fs = require('fs');
const  createLecture=async(req,res)=>{
    try { 
        const lectureName=req.body.lectureName;
        const pdfURL= req.file.filename;
        const courseId=req.body.courseId; 
        const lecture=await Lecture.createLecture(lectureName,pdfURL,courseId);
        const fileStorage=  multer.diskStorage({
            filename:(req,file,cb)=>{   
               cb(null,new Date().toISOString().replace(/:/g, '-')+'_'+req.file.filename)
           }
       })
        res.status(201).send({ lecture }); 
    } catch (error) { 
       
        var filePath = './lectures/'+req.file.filename; 
        fs.unlinkSync(filePath);
        res.status(409).send({ message:error.message }); 
    }
}

const deleteLecture = async (req, res) => {
     try { 
      const id=req.query.id;
      const lecture= await Lecture.find(id)
      if(lecture){ 
        await Lecture.deleteLecture(id)
        var filePath = './lectures/'+lecture.pdfURL; 
        fs.unlinkSync(filePath);
        res.status(201).send({ message:"lecture deleted" });
      } 
      else{
        throw new Error('lecture already deleted')
      }
     } catch (error) {
      res.status(409).send({ message:error.message });
     }
};

const getAllLecturesCourse= async(req,res)=>{
    try {
        const courseId=req.body.courseId
        const lectures=await Lecture.getAllLecturesCourse(courseId)
        res.status(201).send({ lectures });
      } catch (error) {
        res.status(409).send({ message:error.message }); 
      }
}

 
 
module.exports={
    createLecture,
    deleteLecture, 
    getAllLecturesCourse
  
   
}