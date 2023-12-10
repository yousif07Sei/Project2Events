// Load express module
const express = require('express');
// Require passport
const passport = require('passport');
// Initialize router functionality from express framework.
const router = express.Router();
// Require index controller
const indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index_get);

router.get('/auth/google', passport.authenticate("google",{
    scope: ['profile', 'email']
}));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }
));

router.get('/logout', function(req, res){
    req.logout(function() {
        res.redirect('/');
    });
});
module.exports = router;