const express = require('express');

const router = express.Router();
const habitController = require('../controllers/habitController');

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.cookies.user_id) {
        next();
    } else {
        res.redirect('/');
    }
};

router.get('/home',isLoggedIn, habitController.home);
router.post('/create', habitController.create);
router.get('/delete/:id', habitController.delete);
router.post('/update-status/:id',habitController.updateStatus);
router.get('/toggle-status', habitController.toggleStatus);

module.exports = router;