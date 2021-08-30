const UserModel = require( '../models/users');
const UserService = require('./UserService');
const crypto = require('crypto');

class AuthService {

    generateHash(password){
        const salt = crypto.randomBytes(60).toString('base64');
        const hasher = crypto.createHmac('sha256', process.env.HASH_SECRET);
        const hash = hasher.update(`${password}${salt}`).digest('hex');

        return {
            hash: hash,
            salt: salt
        };
    }

    async getUserHash(password, salt){
    
        const hasher = crypto.createHmac('sha256', process.env.HASH_SECRET);
        const hash = hasher.update(`${password}${salt}`).digest('hex');

        return {
            hash: hash
        };
    }

}

module.exports = AuthService