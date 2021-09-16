const UserProviderModel = require('../models').user_providers;

class UserProviderService {

    async createUserProvider(userProviderDetails){
        await UserProviderModel.create({
            user_id: userProviderDetails.userId,
            profile_provider_id: userProviderDetails.profileProviderId,
            provider_id: userProviderDetails.providerId
        })
        .then(data => {
            return data.toJSON()
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getUserProvider(userProviderId){
        return await UserProviderModel.findAll({
            where: {
                provider_id: userProviderId
            },
            raw: true,            
            plain: true               
        })
        .then(data => {
            console.log(data)
            if(data){
                return data;
            }
            return false;
        })
        .catch(err => {
            console.log(err);
        })
    }

    async deleteUserProvider(userProviderId){
        await UserProviderModel.destroy({
            where:{
                id: userProviderId
            },
            raw: true,            
            plain: true              
        })
        .then(data => {
            return data.toJSON();
        })
        .catch(err => {
            console.log(err);
        })
    }

}

module.exports = UserProviderService;