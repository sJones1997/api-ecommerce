const JwtService = require('../services/JwtService');

const jwtMiddleware = (req, res, next) => {
    const token = req.cookie;
    if(token){
        const cookie = JwtService.verifyJWT(token);
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