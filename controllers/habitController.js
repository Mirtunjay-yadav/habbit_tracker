module.exports.home = (req,res)=>{
    return res.status(200).render('homePage',{
        title : "Habit Tracker"
    })
}