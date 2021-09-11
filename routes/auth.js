const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
module.exports = authRouter;
const JwtService = require('../services/JwtService');
authRouter.get('/logout', (req, res, next) => {

});

authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
    const jwtService = new JwtService();
    const token = jwtService.generateJWT({id: req.user.id, username: req.user.username});
    req.user = null;
    req.headers.authorization = `Bearer ${token}`;
    console.log(req.headers)
    res.send("you have reached the callback URI");
});