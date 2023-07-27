const express=require('express')
const router=express.Router()
const levelController=require('../controllers/levelController')
 

router.post('/level',levelController.createLevel);
router.get('/level',levelController.getLevels);
router.delete('/level',levelController.deleteLevel)
module.exports=router