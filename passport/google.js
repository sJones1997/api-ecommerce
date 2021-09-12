const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserService = require('../services/UserService');
const UserProviderService = require('../services/UserProvider');
// const JwtService = require('../services/JwtService');

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(async (id, done) => {
    // const userService = new UserService();
    // const jwtService = new JwtService();
    // await userService.getUserById(id)
    // .then(data => {
    //     jwtService.verifyJWT()
    // })
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/auth/google/redirect"
    }, async (accessToken, refreshToken, profile, done) => {
        const userService = new UserService();
        const userProviderService = new UserProviderService();
        let googleUser;
        await userProviderService.getUserProvider(profile.id)
        .then(data => {
            googleUser = data
        })
        if(googleUser){
            await userService.getUserById(googleUser.user_id)
            .then(data => {
                done(null, data)
            });
        } else {
            const user = await userService.createUser({username: profile.displayName, password: null, local_account: 0});
            await userProviderService.createUserProvider({userId: user.id, profileProviderId: 1, providerId: profile.id});
            done(null, user);           
        }
    })
)