const express = require('express');
const router = express.Router();

// Mock database of users for demonstration purposes
const users = [{ username: 'user1', password: 'pass1' }, { username: 'user2', password: 'pass2' }];

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Here you should create and return a real token (JWT, etc.) instead of 'dummy-token'
        res.json({ token: 'dummy-token' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Token verification route
router.get('/verify', (req, res) => {
    const token = req.headers['authorization'];
    if (token === 'dummy-token') {
        res.json({ valid: true });
    } else {
        res.status(401).json({ valid: false });
    }
});

module.exports = router;