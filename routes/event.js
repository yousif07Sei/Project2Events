// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require event controller
const eventCtrl = require('../controllers/event');
router.use(express.urlencoded({extended: true}));




module.exports = router;