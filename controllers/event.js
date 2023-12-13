const {Category} = require('../models/Category');
const {Event} = require('../models/Event');
const {Review} = require('../models/Review')
const uploadCloudinary = require('../config/cloudinaryConfig');
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

exports.event_create_get = (req, res)=>{
  Category.find()
  .then((categories)=>{
     res.render('event/add', {categories, dayjs})
  })
  .catch((err)=>{
    console.log(err)
  })

}
exports.event_create_post = async (req, res, next)=>{
    // console.log(req.body);

    let event = new Event(req.body)
    let images;
    if (req.files) {
        images = req.files.map(file => `public/images/${file.filename}`);
    } else {
        images = [];
    }
    // console.log(`/images/${req.file.filename}`);
    // let cloudPath = `public/images/${req.file.filename}`
    // uploadCloudinary.upload_single(cloudPath)
    let pathDb = [];
await uploadCloudinary.upload_multiple(images)
    .then((imagesPath)=>{
    //     console.log("this is the log from Cloud")
    imagesPath.forEach(pathImg =>{
        console.log(pathImg.url)
        pathDb.push(pathImg.url);
    })
    console.log(pathDb)
    event.image = pathDb;
    })
    .catch((err)=>{
        console.log(err)
    })

   
    

    event.save()
    .then(() => {
        req.body.category.forEach(category => {
            Category.findById(category)
            .then((category) => {
                category.event.push(event);
                category.save();
            })
            .catch((err) => {
                console.log(err);
            });
        });
        res.redirect('/event/index');
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!");
    })
}

exports.events_index_get = (req, res)=>{
    Event.find().populate('category')
    .then((events)=>{
        res.render('event/index', {events, dayjs})
    })
    .catch((err)=>{
     console.log(err)
    })

}

exports.event_show_get = (req, res)=>{
    console.log(req.query.id);
    Event.findById(req.query.id).populate('category')
    .then((event)=>{
        Review.find({event: req.query.id}).populate('user')
        .then((review)=>{
            res.render('event/detail', {event, review, dayjs})
        })
        .catch((err) =>{
            console.log(err);
            res.render('event/detail', {event, dayjs})
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.event_delete_get = (req, res)=>{
    Event.findByIdAndDelete(req.query.id)
    .then(()=>{
        res.redirect('/event/index')
    })
    .catch((err)=>{
     console.log(err)
    })
}

exports.event_edit_get = (req, res)=>{
    Category.find()
    .then((categories)=>
    {
        Event.findById(req.query.id).populate('category')
        .then((event)=>{
            res.render('event/edit', {event, categories, dayjs})
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.event_edit_post = (req, res)=>{
    Event.findByIdAndUpdate(req.body.id, req.body)
    .then(()=>{
      res.redirect('/event/index')
    })
    .catch((err)=>{
        console.log(err)
    })
    }

    exports.event_review_post = (req, res) =>{
        let review = new Review(req.body)
        review.save()
        .then(() =>{ 
            res.redirect("/event/detail?id="+req.body.event)
        })
        .catch((err) =>{
            console.log(err);
        })
    
    }

exports.review_edit_post = (req, res) =>{
    Review.findByIdAndUpdate(req.body.id, req.body)
    .then(() =>{
        res.redirect("/event/detail?id="+req.body.eventId)
    })
    .catch((err) =>{
        console.log(err);
    })
}

exports.review_delete_post = (req, res) =>{
    console.log(req.body.id);
    Review.findByIdAndDelete(req.body.id)
    .then(() =>{
        res.redirect("/event/detail?id="+req.body.eventId)
    })
    .catch((err) =>{
        console.log(err);
    })
}