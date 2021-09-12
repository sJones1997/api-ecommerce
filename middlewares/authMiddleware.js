const AuthService = require('../services/AuthService');
const JwtService = require('../services/JwtService');

const instantiateAuth = (req, res, next) => {
    const authService = new AuthService();
    const jwtService = new JwtService();
    req.body.authService = authService;
    req.body.jwtService = jwtService;
    next();
}

module.exports = instantiateAuth;