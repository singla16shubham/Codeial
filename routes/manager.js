const express=require('express');
const router=express.Router();

const managerController=require('../controllers/manager_controller');
router.get('/info',managerController.info);


module.exports=router;