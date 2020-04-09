const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    content : {
        type : String,
        trim: true,
        required: [true, 'Please add a description for the remimder']
        
    },

    date: {
        type: Date,
        default: Date.now
        },
        
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      }
});

module.exports = mongoose.model('Reminder',ReminderSchema);