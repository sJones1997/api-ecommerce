const JwtService = require('../services/JwtService');

const jwtMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        const jwtService = new JwtService();
        const cookie = jwtService.verifyJWT(token);
        if(cookie){
            req.cookie = cookie;
            return next();
        }
        return res.status(403).json({'message': 'Unauthorised user', 'status': 0});        
    }
    res.status(403).json({'message': 'Unauthorised user', 'status': 0});
}

module.exports = jwtMiddleware;