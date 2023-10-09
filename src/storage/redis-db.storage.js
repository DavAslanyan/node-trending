const redis = require('redis')
const { REDIS } = require("../config/variables.config")

class RedisStorage {
    static redisClient;

    static async init () {
        RedisStorage.redisClient = redis.createClient({
            url: `redis://${REDIS.HOST}:${REDIS.PORT}`
        }).on('error', RedisStorage._onError);

        await RedisStorage.redisClient.connect();
        console.log('redis - successfully connected')
    }

    /**
     * @description On error event handler.
     */
    static _onError (error) {
        console.error(`Redis connection error: ${error.message}`)
    }
}

module.exports = RedisStorage
