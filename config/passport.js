const passport = require('passport');
const User = require('../models/User');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },

    async function(accessToken, refreshToken, profile, cb){
        try{
        // Look to see if the user exists
        let user = await User.findOne({
            googleId: profile.id
        });
        // If there is a user, return it
        if(user){
            return cb(null,user);
        }
        // Else, create a new user
        else{
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                type: "user"
            });
            return cb(null,user);
        } 
        }catch (err){
            return cb(err);

        }
        // Return the new user
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

// Add to bottom of config/passport.js
passport.deserializeUser(async function(userId, cb) {
    // It's nice to be able to use await in-line!
    cb(null, await User.findById(userId));
});