const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');
router.get('/profile',userController.profile);

router.get('/sign-Up',userController.signUp);
router.get('/sign-In',userController.signIn);

router.post('/create',userController.create);

// Use passport as a middleware
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
),userController.create_session);


module.exports=router;