const express = require('express');
const router = express.Router();
const { enqueueR } = require('../controllers/queueManager');
const { processQueue } = require('../Worker');

router.post('/enqueue', async (req, res) => {
    const { userId, request } = req.body;
    try {
        await enqueueR(userId, request);
        await processQueue(userId);
        res.status(200).send('Request enqueued');
    } catch (err) {
        res.status(400).send('Error enqueuing request');
    }
});

module.exports = router;
