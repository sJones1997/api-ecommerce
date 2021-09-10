

class JwtService {

    generateJWT(payload, options){
        const privateKEY = fs.readFileSync('../keys/private.key', 'utf-8');
    
        const signOptions = {
            issuer: options.issuer,
            subject: options.subject,
            audience: options.audience,
            expiresIn: '24h',
            algorithm:  "RS256"
        };
    
        const token = jwt.sign(payload, privateKEY, signOptions);  
        return `Token - ${token}`
    }


    verifyJWT(token, options){
        const publicKEY = fs.readFileSync('../keys/public.key', 'utf-8'); 
    
        const signOptions = {
            issuer: options.issuer,
            subject: options.subject,
            audience: options.audience,
            expiresIn: '24h',
            algorithm:  ["RS256"]
        };
    
        try {
            return jwt.verify(token, publicKEY, signOptions);
        } catch (err){
            return false;
        }
    
    
    }    



}