const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserService = require('../services/UserService');
const UserProviderService = require('../services/UserProvider');
const CartService = require('../services/CartService');
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
    callbackURL: `${process.env.API_HOST}/api/auth/google/redirect`
    }, async (accessToken, refreshToken, profile, done) => {
        const userService = new UserService();
        const userProviderService = new UserProviderService();
        const cartService = new CartService();
        const googleUser = await userProviderService.getUserProvider(profile.id)
        .then(data => {
            return data
        })
        if(googleUser){
            await userService.getUserById(googleUser.user_id)
            .then(data => {
                done(null, data)
            });
        } else {
            const user = await userService.createUser({username: profile.displayName, password: null, local_account: 0})
            .then(data => {
                if(data){
                    return data;
                }
                return false;
            })
            .catch(err => {
                console.log(err)
                return;
            })
            await userProviderService.createUserProvider({userId: user.id, profileProviderId: 1, providerId: profile.id})
            .then(data => {
                if(data){
                    return data;
                }
                return false;
            })
            .catch(err => {
                console.log(err)
                return;
            })
            await cartService.createCart(user.id)
            .then(data => {
                if(data){
                    return data;
                }
                return false;
            })
            .catch(err => {
                console.log(err)
                return;
            })            
            done(null, user);           
        }
    })
)