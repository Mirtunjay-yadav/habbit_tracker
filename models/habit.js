const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    days: [
        {
            date: String,
            status: String,
        }
    ]
}, { timestamps: true })

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;