const express=require('express');
const router=express.Router();

const usersApi=require('../../../controllers/api/v1/users_api');

router.post('/create_session',usersApi.create_session);

module.exports=router;