

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const logger = require('heroku-logger')

class JwtService {

    generateJWT(payload){
        const privateKEY = fs.readFileSync(path.resolve('keys/private.key'), 'utf-8');
        const signOptions = {
            issuer: 'Sean Jones Portfolio',
            subject: 'test',
            audience: process.env.CLIENT_HOST,
            expiresIn: '24h',
            algorithm:  "RS256"
        };
    
        const token = jwt.sign(payload, privateKEY, signOptions);  
        return token;
    }


    verifyJWT(token){

        const publicKEY = fs.readFileSync(path.resolve('keys/public.key'), 'utf-8');
    
        const signOptions = {
            issuer: 'Sean Jones Portfolio',
            subject: 'test',
            audience: process.env.CLIENT_HOST,
            expiresIn: '24h',
            algorithm:  ["RS256"]
        };
    
        return jwt.verify(token, publicKEY, signOptions, (err, data) => {
            if(err){
                return false;
            }
            return data;
        });
    
    
    }    



}

module.exports = JwtService;