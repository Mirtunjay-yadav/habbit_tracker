const User = require('../models/user');
const Habit = require('../models/habit');

module.exports.home = async (req, res) => {
    try {
        const user = await User.findById(req.cookies.user_id);
        const habits = await Habit.find({}).sort({ createdAt: -1 });
        return res.status(200).render('homePage', {
            title: "Habit Tracker",
            user: user,
            habits: habits,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}

module.exports.create = async (req, res) => {
    try {
        const habit = await Habit.create({
            name: req.body.name,
            description: req.body.description,
            user: req.cookies.user_id,
            days: [
                {
                    date: new Date().toDateString(),
                    status: 'None'
                }
            ],
        })
        return res.status(200).redirect('back');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}