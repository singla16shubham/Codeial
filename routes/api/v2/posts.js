const express=require('express');
const router=express.Router();

const postApi=require('../../../controllers/api/v2/post_api');
// it is useing the same function as in v1 It can be changed by creating another function in post APi controller
router.get('/',postApi.index);

module.exports=router;