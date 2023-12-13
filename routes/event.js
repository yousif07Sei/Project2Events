// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
const isLoggedInAdmin = require('../config/isLoggedInAdmin')
// Require event controller
const eventCtrl = require('../controllers/event');
// Require the Multer module
const multer  = require('multer')
// The file will hold the images
// const upload = multer({ dest: 'public/images/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix  + '-' + file.originalname )
    }
  })

const upload = multer({ storage: storage })

// router.get('/add', isLoggedInAdmin, eventCtrl.event_create_get);
// router.post('/add', isLoggedInAdmin, upload.array('image',5), eventCtrl.event_create_post);
router.get('/add', eventCtrl.event_create_get);
router.post('/add', upload.array('image',5), eventCtrl.event_create_post);
router.get('/index', eventCtrl.events_index_get);
router.get('/detail', eventCtrl.event_show_get);
router.get('/delete', eventCtrl.event_delete_get);
// router.get('/edit', isLoggedInAdmin , eventCtrl.event_edit_get);
router.get('/edit', eventCtrl.event_edit_get);
router.post('/update', upload.array('image',5), eventCtrl.event_edit_post);
router.post('/review', eventCtrl.event_review_post);
router.post('/review/edit', eventCtrl.review_edit_post);
router.post('/review/delete', eventCtrl.review_delete_post);







module.exports = router;