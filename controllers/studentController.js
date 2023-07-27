const Student=require('../models/student')

const  createStudent=async(req,res)=>{
    try { 
        let {firstName,lastName,age,phoneNumber,ParentPhoneNumber,levelId,teacherId}=req.body
        const student=await Student.addStudent(firstName,lastName,age,phoneNumber,ParentPhoneNumber,teacherId,levelId);
        res.status(201).send({ student }); 
    } catch (error) { 
        res.status(409).send({ message:error.message }); 
    }
}

const deleteStudent = async (req, res) => {
     try {
      const id=req.query.id;
      const result=await Student.deleteStudent(id);
      res.status(201).send({ message:"Student deleted" });
     } catch (error) {
      res.status(409).send({ message:error.message });
     }
};

const getStudents=async(req,res)=>{
    try {
      const students=await Student.getAllStudents();
      res.status(201).send({ students });
    } catch (error) {
      res.status(409).send({ message:error.message }); 
    }
}
const getStudentsOfTeacher=async(req,res)=>{
    try {
        const teacherId=req.body.teacherId
        const students=await Student.getAllStudentsOfTeacher(teacherId);
        res.status(201).send({ students });
      } catch (error) {
        res.status(409).send({ message:error.message }); 
      }
}
const findStudent=async (req,res)=>{
    try {
        const id=req.params.id
        const student=await Student.find(id)
        res.status(201).send({ student });
        
    } catch (error) {
        res.status(409).send({ message:error.message }); 
    }
}
module.exports={
    createStudent,
    deleteStudent,
    getStudents,
    getStudentsOfTeacher,
    findStudent
}