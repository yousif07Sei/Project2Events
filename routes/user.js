const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require user controller
const userCtrl = require('../controllers/user');
const isLoggedInAdmin = require('../config/isLoggedInAdmin');
const upload = require('../config/multerConfig');

 
router.get('/edit', isLoggedInAdmin, userCtrl.user_edit_get);
router.post('/update', isLoggedInAdmin,upload.single('avatar'), userCtrl.user_edit_post);

router.get('/index', isLoggedInAdmin, userCtrl.user_index_get);

router.post('/updateType', isLoggedInAdmin, userCtrl.user_edit_type_post);

module.exports = router;
