const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    time: String,
    image: String,
    location: String,
    category: String
},{
    timestamps: true
});

const Event = mongoose.model("Event", eventSchema)

module.exports = {Event};