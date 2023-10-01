const Lecture=require('../models/lecture')
const multer=require('multer')
const fs = require('fs');
const jwt=require('jsonwebtoken')

const createLecture=async(req,res)=>{
    try {   
        const token=req.get('Authorization').split(' ')[1]; 
        const  decodedToken=jwt.verify(token,'fo2shaDoksha');
        const teacherId=decodedToken.id; 
        const lectureName=req.body.lectureName;
        const pdfURL= req.file.filename;
        const courseId=req.body.courseId;  
        const lecture=await Lecture.createLecture(lectureName,pdfURL,courseId,teacherId);
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
        const token=req.get('Authorization').split(' ')[1]; 
        const  decodedToken=jwt.verify(token,'fo2shaDoksha');
        const teacherId=decodedToken.id; 
        const courseId=req.params.courseId
        const lectures=await Lecture.getAllLecturesCourse(courseId,teacherId)
        res.status(201).send({ lectures });
      } catch (error) {
        res.status(409).send({ message:error.message }); 
      }
}

const getFile=async(req,res)=>{
  try { 

    const lectureId=req.params.lectureId
    const pdfURL=await Lecture.getFile(lectureId )  
     
    var data =fs.readFileSync('./lectures/'+pdfURL);
    res.contentType("application/pdf");
    res.send(data);
   
  } catch (error) {
    res.status(409).send({ message:error.message }); 
  }
}

 
 
module.exports={
    createLecture,
    deleteLecture, 
    getAllLecturesCourse,
    getFile
  
   
}