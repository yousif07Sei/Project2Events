// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require category controller
const categoryCtrl = require('../controllers/category');
router.use(express.urlencoded({extended: true}));

router.get('/add', categoryCtrl.category_add_get);
router.post('/add', categoryCtrl.category_add_post);

module.exports = router;