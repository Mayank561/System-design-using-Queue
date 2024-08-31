const { dequeueR } = require('./controllers/queueManager');

const processQueue = async (userId) => {
    while (true) {
        const request = await dequeueR();
        if (request) {
            console.log(`Processing request for user ${userId}:`, request);
            try {
                await simulateProcessing(request);
                console.log(`Request processed successfully for user ${userId}:`, request);
            } catch (error) {
                console.error(`Error processing request for user ${userId}:`, error);
            }
        } else {
            break;
        }
    }
};

const simulateProcessing = async (request) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000); // Simulate processing time up to 5 seconds
    });
};

module.exports = {
    processQueue,
};
