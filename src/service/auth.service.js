const { SuccessHandlerUtil } = require('../util');
const RedisStorage = require('../storage/redis-db.storage')

class AuthService {
    static async authenticate (request, response, next) {
        const { PHPSESSID } = request.body;
        await RedisStorage.redisClient.set("PHPSESSID", PHPSESSID);
        return SuccessHandlerUtil.handleSuccess(response, next, null)
    }

    static async logOut (request, response, next) {
        await RedisStorage.redisClient.set("PHPSESSID", '');
        return SuccessHandlerUtil.handleSuccess(response, next, null)
    }
}

module.exports = AuthService
