const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts_controller');

// We have placed two level of authentication first not showing form to unauthenticated user
// other is here if user is not authenticated then it should not create
router.post('/create',passport.checkAuthentication, postController.create);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports = router;