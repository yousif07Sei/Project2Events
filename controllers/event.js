const {Event} = require('../models/Event')
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

exports.event_create_get = (req, res)=>{
  Event.find()
  .then((event)=>{
     res.render('event/add', {event, dayjs})
  })
  .catch((err)=>{
    console.log(err)
  })

}
exports.event_create_post = (req, res)=>{
    let event = new Event(req.body)
    event.save()
    .then(()=>{
        res.redirect('/event/index')
    })
    .catch((err)=>{
        console.log(err)
    })
}

exports.events_index_get = (req, res)=>{
    Event.find()
    .then((events)=>{
        res.render('event/index', {events, dayjs})
    })
    .catch((err)=>{
     console.log(err)
    })

}

exports.event_show_get = (req, res)=>{
    Event.findById(req.query.id)
    .then((event)=>{
        res.redirect('event/detail', {event})
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
Event.findById(req.query.id)
.then((event)=>{
  res.render('event/edit', {event, dayjs})
})
.catch((err)=>{
    console.log(err)
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