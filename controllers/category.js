const {Category} = require('../models/Category');

exports.category_add_get = (req, res) =>{
    res.render('category/add');
}

exports.category_add_post = (req, res) =>{
    let categroy = new Category(req.body)
    categroy.save()
    .then(() =>{
        res.redirect("/")
    })
    .catch((err) =>{
        console.log(err);
    })
}