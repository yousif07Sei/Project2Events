const {Category} = require('../models/Category');
const {Event} = require('../models/Event');

exports.category_add_get = (req, res) =>{
    res.render('category/add');
}

exports.category_add_post = (req, res) =>{
    let category = new Category(req.body)
    category.save()
    .then(() =>{
        res.redirect("/category/index")
    })
    .catch((err) =>{
        console.log(err);
    })
}

exports.category_index_get = (req, res) => {
    Category.find().populate('event')
    .then((categories) => {
        res.render("category/index", {categories});
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.category_show_get = (req, res) => {
    console.log(req.query.id);
  
    Category.findById(req.query.id).populate('event')
    .then((category) => {
        console.log(category)
        res.render('category/detail', {category})
    })
    .catch((err) => {
        console.log(err);
    })

}

exports.category_delete_get = (req, res) => {
    console.log(req.query.id);  // for debugging purpose
    Category.findByIdAndDelete(req.query.id) // a mongoDB method
    .then(() => {
        res.redirect('/category/index');
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.category_edit_get = (req,res) => {
    Category.findById(req.query.id)
    .then(category => {
        res.render('category/edit', {category});
    })
    .catch(err => {
        console.log(err);
    })
}

exports.category_update_post = (req,res) => {
    console.log(req.body.id);
    // find req.body.id and update req.body
    Category.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect('/category/index');
    })
    .catch((err) => {
        console.log(err);
    })
}
