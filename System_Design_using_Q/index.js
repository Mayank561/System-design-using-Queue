const express = require('express');
const dotenv = require('dotenv');
const promClient = require('prom-client');
const { DB } = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

// Metrics setup
const httpRequestDurationMicro = new promClient.Histogram({
    name: 'http_request_duration_microsecond',
    help: 'Duration of HTTP request in microseconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 500, 1000, 5000],
});

app.use((req, res, next) => {
    const end = httpRequestDurationMicro.startTimer();
    res.on('finish', () => {
        end({
            method: req.method,
            route: req.route ? req.route.path : '',
            code: res.statusCode,
        });
    });
    next();
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const queueRoutes = require('./routes/queueRoutes');

app.use('/auth', authRoutes);
app.use('/queue', queueRoutes);

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics()); 
});

DB().then(() => {
    app.listen(8000, () => {
        console.log('Server running on port 3000');
    });
});
