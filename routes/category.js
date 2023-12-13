// Load express module
const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require category controller
const categoryCtrl = require('../controllers/category');
const isLoggedInAdmin = require('../config/isLoggedInAdmin');
const upload = require('../config/multerConfig');

router.use(express.urlencoded({extended: true}));

router.get('/add', isLoggedInAdmin, categoryCtrl.category_add_get);

router.post('/add', isLoggedInAdmin, upload.single('image') , categoryCtrl.category_add_post);

router.get('/index', categoryCtrl.category_index_get);

router.get('/detail', categoryCtrl.category_show_get);

router.get('/delete', isLoggedInAdmin, categoryCtrl.category_delete_get);

router.get('/edit', isLoggedInAdmin, categoryCtrl.category_edit_get);

router.post('/update', isLoggedInAdmin, upload.single('image'), categoryCtrl.category_update_post);

module.exports = router;
