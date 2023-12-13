const express = require('express');
// Initialize router functionality from express framework.
const router = express.Router();
// Require user controller
const userCtrl = require('../controllers/user');
const isLoggedInAdmin = require('../config/isLoggedInAdmin');

const multer  = require('multer')
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

router.get('/edit', isLoggedInAdmin, userCtrl.user_edit_get);
router.post('/update', isLoggedInAdmin,upload.single('avatar'), userCtrl.user_edit_post);

router.get('/index', isLoggedInAdmin, userCtrl.user_index_get);

router.post('/updateType', isLoggedInAdmin, userCtrl.user_edit_type_post);

module.exports = router;
