const express = require('express');

const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/',homeController.home);
router.get('/login',homeController.signIn);
router.get('/register',homeController.signUp);
router.post('/register',homeController.register);

module.exports = router;