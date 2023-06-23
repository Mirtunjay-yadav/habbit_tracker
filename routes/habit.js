const express = require('express');

const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/home',habitController.home);
router.post('/create',habitController.create);
router.get('/delete/:id',habitController.delete);

module.exports = router;