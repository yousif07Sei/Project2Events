const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require user controller
const userCtrl = require('../controllers/user');
const isLoggedInAdmin = require('../config/isLoggedInAdmin');

router.get('/edit', isLoggedInAdmin, userCtrl.user_edit_get);

module.exports = router;
