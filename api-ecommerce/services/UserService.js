const AuthService = require('./AuthService');
const UserModel = require('../models').Users;

class UserService {

    async createUser(userDetails) {
        const auth = new AuthService();
        const {hash, salt} = auth.generateHash(userDetails.password);
        const newUser = await UserModel.create({username: userDetails.username, password: hash, salt: salt});

        return newUser.Id;        
    }


}

module.exports = UserService;