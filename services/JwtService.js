

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

class JwtService {

    generateJWT(payload){
        const privateKEY = fs.readFileSync(path.resolve('keys/private.key'), 'utf-8');
        const signOptions = {
            issuer: 'Sean Jones Portfolio',
            subject: payload.username,
            audience: 'http://localhost:3000',
            expiresIn: '24h',
            algorithm:  "RS256"
        };
    
        const token = jwt.sign(payload, privateKEY, signOptions);  
        return token;
    }


    verifyJWT(token, options){
        const publicKEY = fs.readFileSync(path.resolve('keys/public.key'), 'utf-8');
    
        const signOptions = {
            issuer: 'Sean Jones Portfolio',
            subject: options.subject,
            audience: 'http://localhost:3000',
            expiresIn: '24h',
            algorithm:  ["RS256"]
        };
    
        jwt.verify(token, publicKEY, signOptions, (err, data) => {
            if(err){
                return false;
            }
            return data
        });
    
    
    }    



}

module.exports = JwtService;