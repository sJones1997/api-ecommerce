const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware');
module.exports = authRouter;

authRouter.use(authMiddleware);

authRouter.get('/logout', (req, res, next) => {
    req.logout();
    res.clearCookie('token');
    res.status(200).json({'message': 'Logout', 'status': 1});
});

authRouter.get('/verify', (req, res, next) => {
    if(req.cookies.token){
        const valid = req.body.jwtService.verifyJWT(req.cookies.token);  
        if(valid){
            return res.status(200).json({'message': 'User already signed in', 'status': 1});  
        }           
    }
    return res.status(200).json({'message': 'Sign in required', 'status': 0})       
})

authRouter.post('/', async (req, res, next) => {
    const authService = req.body.authService;
    const userCreated = await authService.registerUser(req.headers.authorization);
    if(userCreated.status !== 0){
        const token = req.body.jwtService.generateJWT(userCreated);
        res.cookie('token', token, {httpOnly: true, sameSite: true});
        return res.status(200).json({'message': 'User created', 'status': 1})
    }
    return res.status(500).json(userCreated)
});

authRouter.post('/login', async(req, res, next) => {
    const authService = req.body.authService;
    const userResult = await authService.loginUser(req.headers.authorization);
    if(userResult.status !== 0){
        const token = req.body.jwtService.generateJWT(userResult);
        res.cookie('token', token, {httpOnly: true, sameSite: true});
        return res.status(200).json({'status': 1, 'message': 'Login successful'})
    }
    return res.status(500).json(userResult)
})

authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));


authRouter.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
    const token = req.body.jwtService.generateJWT({id: req.user.id, username: req.user.username});    
    res.cookie('token', token, {httpOnly: true, sameSite: true});
    return res.status(200).redirect('http://localhost:3000/')
});