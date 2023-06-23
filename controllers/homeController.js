const User = require('../models/user');

// Handles rendering of the home page
module.exports.home = async (req, res) => {
    try {
        return res.status(200).render('home', {
            title: "Home"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

// Handles rendering of the login page
module.exports.signIn = (req, res) => {
    if (req.cookies.user_id) {
        return res.redirect('/habit/home');
    }
    return res.render('login', { title: 'Login' })
}

// Handles rendering of the registration page
module.exports.signUp = (req, res) => {
    if (req.cookies.user_id) {
        return res.redirect('/habit/home');
    }
    return res.render('Register', { title: 'Register' })
}

// Handles user registration
module.exports.register = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email
        })

        await newUser.save();

        return res.redirect('/login');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Serval Error');
    }
}

// Handles user login
module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send('User Not Found')
        }
        res.cookie('user_id', user.id);
        return res.status(200).redirect('/habit/home');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}

// Handles user logout
module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('user_id');
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}