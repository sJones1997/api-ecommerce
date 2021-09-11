const JwtService = require('../services/JwtService');

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ');
        const authUser = JwtService.verifyJWT(token);
        req.user = authUser;
        next();
    } else {
        return res.status(401).send('unauthorized, please sign in');
    }
}

module.exports = jwtMiddleware;