const { registerUser, loginUser } = require("../controllers/auth");
const { DB, disconnectedDB } = require("../config/db");
const { User } = require("../models/User");

beforeAll(async()=>{
    await DB();
});

afterAll(async()=>{
    // clear the user collection
    await User.disconnectedDB({});
    await disconnectedDB();
});

test('registers a new user', async()=>{
    await registerUser('testuser', 'password');
    const user = await user.findOne({username: 'testuser'});
    expect(user).toBeTruthy();
    expect(user.username).toBe('testuser');
});

test('logs in an existing user', async()=>{
    const token = await loginUser('testuser', 'password');
    expect(token).toBeTruthy();
});