const {Category} = require('../models/Category');
const {Event} = require('../models/Event')
const {Review} = require('../models/Review')
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
exports.event_create_post = (req, res)=>{
    let event = new Event(req.body)
    event.save()
    .then(() => {
        req.body.category.forEach(category => {
            Category.findById(category)
            .then((category) => {
                category.event.push(category);
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

// exports.event_show_get = (req, res)=>{
//     Event.findById(req.query.id)
//     .then((event)=>{
//         res.render('event/detail', {event})
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }

exports.event_show_get = (req, res)=>{
    Event.findById(req.query.id).populate('category')
    .then((event)=>{
        console.log
        Review.find({event: req.query.id}).populate('user')
        .then((review)=>{
            res.render('event/detail', {event, review})
        })
        .catch((err) =>{
            console.log(err);
            res.render('event/detail', {event})
        })
    })
    .catch((err)=>{
        console.log(err)
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
            res.redirect("/event/index")
        })
        .catch((err) =>{
            console.log(err);
        })
    
    }