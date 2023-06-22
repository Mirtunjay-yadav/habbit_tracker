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
        return res.status(500).send(err);
    }
}