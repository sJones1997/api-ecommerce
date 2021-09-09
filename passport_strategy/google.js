const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserService = require('../services/UserService');
const UserProviderService = require('../services/UserProvider');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/redirect"
    }, async (accessToken, refreshToken, profile, done) => {
        const userService = new UserService();
        const userProviderService = new UserProviderService();
        const googleUser = await userProviderService.getUserProvider(profile.id);
        if(googleUser){
            return googleUser.id
        } else {
            const newUserId = await userService.createUser({username: profile.displayName, password: null, local_account: 0});
            const result = await userProviderService.createUserProvider({userId: newUserId, profileProviderId: 1, providerId: profile.id});
        }
    })
)