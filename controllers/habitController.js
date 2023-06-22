const User = require('../models/user');

module.exports.home = async (req,res)=>{
    try{
        const user = await User.findById(req.cookies.user_id);

        return res.status(200).render('homePage',{
        title : "Habit Tracker",
        user : user
    })

    }catch(err){
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}