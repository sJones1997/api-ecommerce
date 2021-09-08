const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserModel = require('../models/users').Users;
const UseProviderModel = require('../models/user_providers').user_provider;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/redirect"
    }, (accessToken, refreshToken, profile, done) => {
        const googleProfileId = profile.id;
        const googleUsername = profile.displayName;
        done();
    })
)