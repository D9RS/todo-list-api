const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

const isAuthorized = require('../middlewares/isAuthorized');
const isNotAuthorized = require('../middlewares/isNotAuthorized');

router.post('/signup', isNotAuthorized, AuthController.signUp);
router.post('/signin', isNotAuthorized, AuthController.signIn);
router.post('/signout', isAuthorized, AuthController.signOut);

module.exports = router;
