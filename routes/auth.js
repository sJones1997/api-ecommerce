const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
module.exports = authRouter;

authRouter.get('/logout', (req, res, next) => {

});

authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
    console.log("you have reached the callback URI");
});