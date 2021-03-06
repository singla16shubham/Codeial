const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
// user profle should be accessible only when signed in 
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id',userController.update);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out', userController.destroy_session);

// For reset Password
router.get('/reset_password',userController.reset_pass);
router.post('/reset-mail',userController.reset_mail);
router.get('/set_password/:accessToken',userController.set_pass);

// below router will be used to update the password in the database
router.post('/update_password/:user',userController.update_pass);


// FOr google oauth
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.create_session)



router.post('/create', userController.create);

// Use passport as a middleware
router.post('/create_session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), userController.create_session);


module.exports = router;