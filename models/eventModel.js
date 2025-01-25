const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: String,
    description: String, 
    date: Date,
    time: String,
    image: { type: String }, 
    bookings:[{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users' 
        },
        persons: String,
    }],
}, {
    timestamps: true
});


const eventModel = new mongoose.model("events", eventSchema);


module.exports = {eventModel}