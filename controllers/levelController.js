const Level=require('../models/level')

const  createLevel=async(req,res)=>{
    try {
        const  levelName=req.body.levelName
        const level=await Level.createLevel(levelName);
         res.status(201).send({ level }); 
    } catch (error) { 
        res.status(409).send({ message:error.message }); 
    }
}

const deleteLevel = async (req, res) => {
     try {
      const id=req.query.id;
      const result=await Level.deleteLevel(id);
      res.status(201).send({ message:"level deleted" });
     } catch (error) {
      res.status(409).send({ message:error.message });
     }
};

const getLevels=async(req,res)=>{
    try {
      const levels=await Level.getAllLevels();
      res.status(201).send({ levels });
    } catch (error) {
      res.status(409).send({ message:error.message }); 
    }
}
module.exports={
    createLevel,
    deleteLevel,
    getLevels
}