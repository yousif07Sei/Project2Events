const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    event: String
},{
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

module.exports = {Category};