const express = require('express');

const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/home',habitController.home);
router.post('/create',habitController.create);

module.exports = router;