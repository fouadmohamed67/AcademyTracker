const Teacher=require('../models/teacher')
 
const signup = async (req, res) => {
    try {
        
      const teacher = new Teacher(req.body); 
      await teacher.save();
      res.status(201).send({ teacher });
    } catch (e) {
      console.log(e);
      res.status(409).send({ message: e.message });
    }
  }

const login=async(req,res)=>{
    try {
        const teacher=await Teacher.findByCredentials(
            req.body.email,
            req.body.password
        )     
        if(teacher)
        { 
           const token=await teacher.generateToken()
            res.status(200).send({teacherid:teacher.id,token});
        }
        else {
            throw new Error("email or password not correct");
          }
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message})
    }
}
module.exports={
    signup,
    login
}