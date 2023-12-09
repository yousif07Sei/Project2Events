const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
    name: String,
    event: String
},{
    timestamps: true
});

const Categorie = moongoose.model("Categorie", categorieSchema);

module.exports = {Categorie};