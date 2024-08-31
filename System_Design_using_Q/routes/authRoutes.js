const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await registerUser(username, password);
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await loginUser(username, password);
        res.status(200).send({ token });
    } catch (err) {
        res.status(400).send('Invalid credentials');
    }
});

module.exports = router;
