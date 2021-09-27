const HashService = require('./HashService');
const UserModel = require('../models').Users;

class UserService {

    async createUser(userDetails) {
        const auth = new HashService();
        const {hash, salt} = auth.generateHash(userDetails.password);
        return await UserModel.create({
            username: userDetails.username, 
            password: hash, 
            salt: salt, 
            local_account: userDetails.local_account
        })
        .then(data => {
            return data.toJSON();
        })
        .catch(err => {
            return err.errors[0].validatorKey === 'not_unique' ? 'A user with this name already exists' : err.errors[0].validatorKey.message
        });   
    }

    async getAllUsers(){
        return await UserModel.findAll({
            attributes: ['username'],
            raw: true,            
            plain: true            
        })
        .then(data => {
            return data.toJSON();
        })
        .catch(err => {
            console.log(err)
        });
    }

    async getUserById(id){
        return await UserModel.findAll({
            where: {
                id: id
            },
            raw: true,            
            plain: true
        })
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        });   
    }

    async getUserByName(username){
        return await UserModel.findAll({
            where: {
                username: username
            },
            raw: true,
            plain: true
        })
        .then(data => {
            if(data){
                return data;
            }
            return false;
        })
        .catch(err => {
            return false;
        });
    }

    async updateUser(newUserObj, savedUserObj){
        let updatedObj = {}
        const auth = new HashService();
        const {hash} = await auth.getUserHash(newUserObj.password, savedUserObj.salt); 

        if(savedUserObj.username !== newUserObj.username){
            const updateUsername = await UserModel.update({username: newUserObj.username}, {
                where: {
                    id: savedUserObj.id
                }
            });
            updatedObj['username'] = updateUsername;
        }

        if(savedUserObj.password !== hash){
            const newHash = auth.generateHash(newUserObj.password);
            const updatePassword = await UserModel.update({password: newHash.hash, salt: newHash.salt},{
                where: {
                    id: savedUserObj.id
                }
            } )
            updatedObj['password'] = updatePassword;
        }
        return updatedObj;

    }

}

module.exports = UserService;