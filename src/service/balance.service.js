const axios = require('axios');
const { SuccessHandlerUtil, ErrorsUtil } = require('../util')
const RedisStorage = require('../storage/redis-db.storage')
const { TRENDING_API } = require('../config/variables.config')
const { UnauthorizedError } = ErrorsUtil;

class BalanceService {

    static async getBalance (request, response, next) {
        const PHPSESSID = await RedisStorage.redisClient.get("PHPSESSID");
        if (!PHPSESSID) {
            throw new UnauthorizedError()
        }

        const resData = await axios.get(TRENDING_API.PROFILE, {
            headers: {
                Cookie: PHPSESSID.startsWith("PHPSESSID") ? PHPSESSID : `PHPSESSID=${PHPSESSID}`
            }
        })
            .then(res => res.data)
            .catch(async error => {
                await RedisStorage.redisClient.set("PHPSESSID", "");
                throw new UnauthorizedError(error?.response?.data?.message)
            });
        const result = {
            status: true,
            data: resData?.data,
        }
        return SuccessHandlerUtil.handleGet(response, next, result)
    }
}

module.exports = BalanceService
