const redisClient = require('../config/redis');

const setupSocketHandlers = (io) => {
    redisClient.pSubscribe('notifications:*', (message, channel) => {
        const data = JSON.parse(message);
        const userId = data.userId;

        io.to(userId).emit('notification', data.message);
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('subscribe', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} subscribed`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

module.exports = { setupSocketHandlers };