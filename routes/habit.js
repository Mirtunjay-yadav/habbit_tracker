const express = require('express');

const router = express.Router();
const habitController = require('../controllers/habitController');

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

module.exports = router;