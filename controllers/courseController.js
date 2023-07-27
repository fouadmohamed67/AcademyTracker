const Course=require('../models/course')

const  createCourse=async(req,res)=>{
    try {
        const courseName=req.body.courseName;
        const levelId=req.body.levelId;
        const course=await Course.createCourse(courseName,levelId);
         res.status(201).send({ course }); 
    } catch (error) { 
        res.status(409).send({ message:error.message }); 
    }
}

const deleteCourse = async (req, res) => {
     try {
      const id=req.query.id;
      const result=await Course.deleteCourse(id);
      res.status(201).send({ message:"Course deleted" });
     } catch (error) {
      res.status(409).send({ message:error.message });
     }
};

const getCourses=async(req,res)=>{
    try {
      const courses=await Course.getAllCourses();
      res.status(201).send({ courses });
    } catch (error) {
      res.status(409).send({ message:error.message }); 
    }
}
///////course student
const registerAtCourse=async(req,res)=>{
    try {
        const studentId=req.body.studentId;
        const courseId=req.body.courseId;
        const day=req.body.day;
        const appointment=req.body.appointment;
        const result=await Course.registerAtCourse(studentId,courseId,day,appointment)
        res.status(201).send({ message:"Registration is done" });
    } catch (error) {
        res.status(409).send({ message:error.message }); 
    }
}
const removeRegistration=async(req,res)=>{
    try {
        const id=req.query.id
        await Course.removeRegistration(id)
        res.status(201).send({ message:"Registration deleted" });
    } catch (error) {
        res.status(409).send({ message:error.message }); 
    }
}
const coursesStudentRegistrationInfo =async(req,res)=>{
    try {
        const id=req.body.id
        const studentCourses=await Course.coursesStudentRegistrationInfo(id);
        res.status(201).send({ studentCourses });
      } catch (error) {
        res.status(409).send({ message:error.message }); 
      }
}
const updateStudentCourse=async(req,res)=>{
    try {
        const id=req.body.id;
        const updatedData=req.body 
       await  Course.findStudentCourseAndUpdate(id,updatedData);
       res.status(201).send({ message:'new data updated' });
    } catch (error) {
        res.status(409).send({ message:error.message }); 
    }
}

  
module.exports={
    createCourse,
    deleteCourse,
    getCourses,
    registerAtCourse,
    removeRegistration,
    coursesStudentRegistrationInfo,
    updateStudentCourse
}