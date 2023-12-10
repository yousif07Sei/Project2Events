// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require event controller
const eventCtrl = require('../controllers/event');

router.get('/add', eventCtrl.event_create_get);
router.post('/add', eventCtrl.event_create_post);
router.get('/index', eventCtrl.events_index_get);
router.get('/detail', eventCtrl.event_show_get);
router.get('/delete', eventCtrl.event_delete_get);
router.get('/edit', eventCtrl.event_edit_get);
router.post('/update', eventCtrl.event_edit_post);




module.exports = router;