const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
module.exports = authRouter;

authRouter.get('/logout', (req, res, next) => {

});

authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

authRouter.get('/google/redirect', (req, res, next) => {
    console.log("here!")
});