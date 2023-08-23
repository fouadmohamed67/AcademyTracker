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
const getCoursesOfLevel=async(req,res)=>{
    try { 
        const courses=await Course.getCoursesOfLevel(req.params.id);
        res.status(201).send({ courses });
      } catch (error) {
        res.status(409).send({ message:error.message }); 
      }
}
const getCoursesById=async(req,res)=>{
    try { 
        const course=await Course.find(req.params.id);
        res.status(201).send({ course });
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
        console.log(error)
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
        const id=req.params.id
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
        console.log(req.body)
       await  Course.findStudentCourseAndUpdate(id,updatedData);
       res.status(201).send({ message:'new data updated' });
    } catch (error) {
        res.status(409).send({ message:error.message }); 
    }
}

const findStudent_course=async(req,res)=>{
    try {
        const id=req.params.id; 
       const registeration =await Course.findStudent_course(id); 
       res.status(201).send({ registeration });
    } catch (error) {
        res.status(409).send({ message:error.message }); 
    }
}



/////for DashBord
const getStudentsPerDay=async(req,res)=>{
    try {
        const teacherId=req.params.teacherId; 
       const data =await  Course.getStudentsPerDay(teacherId)
       res.status(201).send({ data });
    } catch (error) {
        res.status(409).send({ message:error.message }); 
    }
}

const getnumLessonsOfDay=async(req,res)=>{
    try {
        const teacherId=req.params.teacherId; 
        const data =await Course.getNumLessonsOfDay(teacherId)
        res.status(201).send({ data });
    } catch (error) {
        res.status(409).send({ message:error.message });
    }
}

const nextStudent=async(req,res)=>{
    try {
        const teacherId=req.params.teacherId; 
        const student =await Course.nextStudent(teacherId)
        res.status(201).send({ student });
    } catch (error) {
        res.status(409).send({ message:error.message });
    }
}

const appointmentForWeek=async(req,res)=>{
    try {
        const teacherId=req.params.teacherId; 
        const allAppoint =await Course.appointmentForWeek(teacherId)
        let day;
        let  appointments=[[],[],[],[],[],[],[]] 
        for(let i=0;i<allAppoint.length;i++)
        {
         day=allAppoint[i].day  
         appointments[day-1].push(allAppoint[i])
        }
        res.status(201).send({ appointments });
    } catch (error) {
        console.log(error)
        res.status(409).send({ message:error.message });
    }
}


  
module.exports={
    createCourse,
    deleteCourse,
    getCourses,
    getCoursesById,
    registerAtCourse,
    removeRegistration,
    coursesStudentRegistrationInfo,
    updateStudentCourse,
    getCoursesOfLevel,
    findStudent_course,
    getStudentsPerDay,
    getnumLessonsOfDay,
    nextStudent,
    appointmentForWeek
}