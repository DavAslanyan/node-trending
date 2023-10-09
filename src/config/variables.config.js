const VariablesConfig = {
    CORS: {
        ORIGIN: process.env.CORS_ORIGIN || '*'
    },
    REDIS: {
        HOST: process.env.REDIS_HOST || "localhost",
        PORT: process.env.REDIS_PORT || 6379,
    },
    PORT: process.env.PORT || '3000',
    TRENDING_API: {
        PROFILE: process.env.TRENDING_API_PROFILE || "https://trending.bid/api/user/getprofile",
    },
}

module.exports = VariablesConfig
