const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
router.get('/profile',userController.profile);

router.get('/sign-Up',userController.signUp);
router.get('/sign-In',userController.signIn);

router.post('/create',userController.create);

router.post('/create_session',userController.create_session);


module.exports=router;