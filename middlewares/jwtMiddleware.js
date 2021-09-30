const JwtService = require('../services/JwtService');

const jwtMiddleware = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token;
    if(token){
        const jwtService = new JwtService();
        const cookie = jwtService.verifyJWT(token);
        if(cookie){
            req.verifiedUserId = cookie.id;
            return next();
        }
        return res.status(403).json({'message': 'Unauthorised user', 'status': 0});        
    }
    res.status(403).json({'message': 'Unauthorised user', 'status': 0});
}

module.exports = jwtMiddleware;