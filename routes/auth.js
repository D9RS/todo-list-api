const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

const isAuthorized = require('../middlewares/isAuthorized');
const isNotAuthized = require('../middlewares/isNotAuthized');

router.post('/signup', isNotAuthized, AuthController.signUp);
router.post('/signin', isNotAuthized, AuthController.signIn);
router.post('/signout', isAuthorized, AuthController.signOut);

module.exports = router;
