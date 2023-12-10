const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    comment: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
},{
    timestamps: true
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = {Review};