const express = require('express');

const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/',homeController.home);
router.get('/login',homeController.signIn);
router.get('/register',homeController.signUp);
router.post('/register',homeController.register);
router.post('/login',homeController.login);
router.get('/logout',homeController.logout);
router.use('/habit',require('./habit'));

module.exports = router;