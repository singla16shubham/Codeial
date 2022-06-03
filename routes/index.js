const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);
router.use('/users',require('./users'))
router.use('/posts',require('./posts'))
// router.use('/manager',require('./manager'))

// for any further routes access form here
//  router.use('/routername',require('./routerfile'))

module.exports=router;