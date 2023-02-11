const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    time: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;