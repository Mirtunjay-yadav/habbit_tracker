const User = require('../models/user');

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

module.exports.signIn = (req, res) => {
    return res.render('login', { title: 'Login' })
}

module.exports.signUp = (req, res) => {
    return res.render('Register', { title: 'Register' })
}

module.exports.register = async (req,res)=>{
    try{
        const user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({
                message : "User already exists"
            })
        }
        const newUser = new User({
            name : req.body.name,
            email : req.body.email
        })

        await newUser.save();

        return res.redirect('/login');
    }catch (err) {
        console.log(err);
        return res.status(500).send('Internal Serval Error');
    }
}

module.exports.login = async (req,res) => {
    try{
        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(400).send('User Not Found')
        }
        res.cookie('user_id',user.id);
        return res.status(200).redirect('/habit/home');
    }catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}

module.exports.logout = async (req,res) => {
    try{
        res.clearCookie('user_id');
        return res.redirect('/');
    }catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}