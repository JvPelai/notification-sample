const redisClient = require('../config/redis');

const publishNotification = async (userId, message) => {
    await redisClient.publish(
        `notifications:${userId}`,
        JSON.stringify({ userId, message })
    );
};

module.exports = { publishNotification };