const UserService = require('../services/UserService');

const instantiateObjects = (req, res, next) => {
    const userService = new UserService();
    req.body.userService = userService;
    next();
}

module.exports = instantiateObjects;