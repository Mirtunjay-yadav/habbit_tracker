module.exports.home = async (req,res)=>{
    try{
        return res.status(200).render('home',{
            title : "Home"
        });
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}