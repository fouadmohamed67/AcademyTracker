const express=require('express')
const router=express.Router()
const authController=require('../controllers/auth')
const {body}=require('express-validator')
 



router.put('/signUp',[
    body('email')
    .isEmail()
    .withMessage('enter a valid email'),
    body('password').trim().isLength({min:6}),
    body('phoneNumber').trim().isLength(11),
    body('firstName').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty(),

] ,authController.signup)

router.post('/login' ,authController.login)
router.get('/ChekToken',authController.stillLogin)

module.exports=router