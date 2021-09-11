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
            console.log(err)
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
        await UserModel.findAll({
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

    async deleteUser(id){
        const deleteUser = await UserModel.destroy({
            where: {
                id: id
            },
            raw: true,            
            plain: true
        });
        return deleteUser;
    }


}

module.exports = UserService;