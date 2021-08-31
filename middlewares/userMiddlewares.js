const UserService = require('../services/UserService');

const instantiateUser = (req, res, next) => {
    const userService = new UserService();
    req.body.userService = userService;
    next();
}

module.exports = instantiateUser;