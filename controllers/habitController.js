const User = require('../models/user');
const Habit = require('../models/habit');

// Handles rendering of the home page
module.exports.home = async (req, res) => {
    try {
        const user = await User.findById(req.cookies.user_id);
        if (!user) {
            return res.redirect('/login');
        }
        const habits = await Habit.find({ user }).sort({ createdAt: -1 });
        return res.status(200).render('homePage', {
            title: "Habit Tracker",
            user: user,
            habits: habits,
            weeklyDates: getOneWeekDate()
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}

// Helper function to get an array of dates for the current week
function getOneWeekDate() {
    let months = ["", "Jan", "Feb", "March", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dates = [];
    for (let i = 6; i >= 0; i--) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i);
        let mm = currentDate.getMonth() + 1;
        mm = months[mm];
        let dd = currentDate.getDate();
        if (dd < 10) dd = '0' + dd;
        dates.push(mm + ' ' + dd);
    }
    return dates;
}

// Handles the creation of a new habit
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
};

// Handles the deletion of a habit
module.exports.delete = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(400).send('Habit Not Found');
        }
        await habit.deleteOne();
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}

// Handles updating the status of a habit
module.exports.updateStatus = async (req, res) => {
    try {
        const { habitId, status } = req.body;
        const habit = await Habit.findById(habitId);
        if (!habit) {
            return res.status(400).send('Habit not found');
        }
        const today = new Date().toDateString();
        const dayToUpdate = habit.days.find((day) => day.date === today);
        if (dayToUpdate) {
            dayToUpdate.status = status;
        }
        await habit.save();
        return res.status(200).redirect('back');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}

// Handles toggling the status of a habit
module.exports.toggleStatus = async (req, res) => {
    try {
        let id = req.query.id;
        let date = req.query.date;
        const habit = await Habit.findById(id);

        if (!habit) {
            console.log('Habit not present!');
            return res.redirect('back');
        }

        let days = habit.days;
        let found = false;

        days.forEach((day) => {
            if (day.date === date) {
                if (day.status === 'Done') {
                    day.status = 'Not done';
                } else if (day.status === 'Not done') {
                    day.status = 'Done';
                }
                found = true;
            }
        });

        if (!found) {
            days.push({ date: date, status: 'Done' });
        }

        habit.days = days;
        await habit.save();
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
}