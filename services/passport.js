const passport      = require('passport');
const keys          = require('../config/keys');
const mongoose      = require('mongoose');
const GoogleStategy = require('passport-google-oauth20').Strategy;
// model class
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // error, identify info
  done(null, user.id);
   //user.id is s short cut to user._id.$oid
});
passport.deserializeUser((id, done) =>{
  User.findById( id )
  .then(user => {
    done(null, user)
  });
});


passport.use(
  new GoogleStategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy:true
  },
    async (accessToken, refreshToken, profile, done) => {
      // model instance
      const existingUser = await User.findOne({ googleId : profile.id });

        // does the id already exist
        if(existingUser) return done(null, existingUser);

        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
    }
  )
);
