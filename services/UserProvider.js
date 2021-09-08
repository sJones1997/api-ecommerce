const UserProviderModel = require('../models').user_providers;

class UserProviderService {

    async createUserProvider(userProviderDetails){
        const newUserProvider = await UserProviderModel.create({user_id: userProviderDetails.userId, profile_provider_id: userProviderDetails.profileProviderId, provider_id: userProviderDetails.providerId});
        return newUserProvider.id;
    }

    async getUserProvider(userProviderId){
        const getUserProvider = await UserProviderModel.findAll({
            where: {
                id: userProviderId
            }
        });
        return JSON.stringify(getUserProvider);
    }

    async deleteUserProvider(userProviderId){
        const deleteUserProvider = await UserProviderModel.destroy({
            where:{
                id: userProviderId
            }
        });
        return userProviderId;
    }

}

module.exports = UserProviderService;