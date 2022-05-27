const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
router.get('/profile',userController.profile);

router.get('/sign-Up',userController.signUp);
router.get('/sign-In',userController.signIn);


module.exports=router;