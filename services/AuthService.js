const HashService = require('../services/HashService');
const UserService = require('../services/UserService');
const CartService = require('../services/CartService');

class AuthService {

    async registerUser(userDetails){
        let detailsSplit = this.decodeUserDetails(userDetails);
        detailsSplit[0] = detailsSplit[0].toLowerCase();
        if(detailsSplit[1] !== detailsSplit[2]){
            return {'status': 0, 'message': 'passwords do not match'};
        }
        const userService = new UserService();   
        const cartService = new CartService();     
        const user = await userService.createUser({username: detailsSplit[0], password: detailsSplit[1]})
        .then(data => {
            if(typeof(data) !== 'string'){
                return data
            }
            return {'message': data, 'status': 0} 
        })
        .catch(err => {
            return {'message': err, 'status': 0} 
        })    
        const cartCreated = await cartService.createCart(user.id)
        .then(data => {
            if(data){
                return true;
            }
            return false;
        }) 
        .catch(err => {
            return false;
        })
        if(cartCreated){
            return user;
        }
        return {'message': 'Problem creating cart', 'status': 0} 
    }

    async loginUser(userDetails){
        const detailsSplit = this.decodeUserDetails(userDetails);
        detailsSplit[0] = detailsSplit[0].toLowerCase();
        const userService = new UserService()
        const user = await userService.getUserByName(detailsSplit[0])
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err)
        });

        if(user){
            const hashService = new HashService();
            const confirmUserPassword = await hashService.getUserHash(detailsSplit[1], user.salt)
            .then(data => {
                if(data.hash === user.password){
                    return user;
                } else {
                    return {'message': 'Incorrect password', 'status': 0};
                }   
            })
            .catch(err => {
                console.log(err)
            })
            return confirmUserPassword;

        } else {
            return {'message': 'Unknown user', 'status': 0};
        }
            
    }

    decodeUserDetails(encodedDetails){
        let decode = Buffer.from(encodedDetails.split(" ")[1], 'base64').toString('utf-8');
        return decode.split(":");
    }

}

module.exports = AuthService;