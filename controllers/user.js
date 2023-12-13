const {User} = require('../models/User');
const uploadCloudinary = require('../config/cloudinaryConfig');

exports.user_edit_get =  (req, res) =>{  
    res.render('user/edit')
}  
exports.user_edit_post = async (req , res)=>{
// Check if a new image was uploaded
if (req.file) {
    let image = `public/images/${req.file.filename}`;
    uploadCloudinary.upload_single(image)
    .then((imagePath) =>{
        console.log(imagePath.url)
        console.log(req.body)
        
        const updateFields = {avatar: req.body.name, avatar: imagePath.url};
        User.findByIdAndUpdate(req.body.id, updateFields)
        .then(() => {
            res.redirect('/event/index');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });        })
    .catch((err) =>{
        console.log(err);
    })    
}
else{
    User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect('/event/index');
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
}
}

exports.user_index_get =  (req, res) =>{  
    User.find()
    .then((users) => {
        res.render("user/index", {users});
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.user_edit_type_post =  (req, res) =>{  
    console.log(req.body.id);

    User.findByIdAndUpdate(req.body.id, {type: req.body.userType})
    .then(() => {
        res.redirect('/user/index');
    })
    .catch((err) => {
        console.log(err);
    })
}
 
