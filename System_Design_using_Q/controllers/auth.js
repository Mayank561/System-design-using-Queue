const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Secret = process.env.SECRET_KEY; // Make sure this is set in .env

const registerUser = async (username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Error registering user: ' + error.message);
    }
};

const loginUser = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = jwt.sign(
                    { id: user._id, username: user.username },
                    Secret,
                    { expiresIn: '1h' }
                );
                return token;
            }
        }
        throw new Error('Invalid credentials');
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

module.exports = {
    registerUser,
    loginUser,
};
