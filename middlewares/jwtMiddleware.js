const JwtService = require('../services/JwtService');

const jwtMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if((token && req.body.path === '/login') || (token && req.body.path === '/register')){
        console.log("here")
        res.status(200).json({'message': 'User already signed in', 'status': 1});  
    } else if (req.body.path && !token){
        console.log("yes")
    } else if (token){
        const jwtService = new JwtService();
        const cookie = jwtService.verifyJWT(token);
        if(cookie){
            req.cookie = cookie;
            return next();
        }
        res.status(403).json({'message': 'Unauthorised user', 'status': 0});        
    } else {
        res.status(403).json({'message': 'Unauthorised user', 'status': 0});  
    }
}

module.exports = jwtMiddleware;