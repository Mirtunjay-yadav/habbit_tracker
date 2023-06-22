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