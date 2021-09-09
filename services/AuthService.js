const UserModel = require( '../models/users');
const UserService = require('./UserService');
const crypto = require('crypto');

class AuthService {

    generateHash(password){
        const salt = password !== null ? crypto.randomBytes(60).toString('base64') : null;
        const hasher = crypto.createHmac('sha256', process.env.HASH_SECRET);
        const hash = password !== null ? hasher.update(`${password}${salt}`).digest('hex') : null;
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