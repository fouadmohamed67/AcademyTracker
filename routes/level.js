const express=require('express')
const router=express.Router()
const levelController=require('../controllers/levelController')
const isAuth=require('../middleware/auth');


router.post('/level',isAuth,levelController.createLevel);
router.get('/level',isAuth,levelController.getLevels);
router.delete('/level',isAuth,levelController.deleteLevel)
module.exports=router