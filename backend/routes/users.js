const express = require('express');
const router = express.Router();

// Simulated database
let users = [];

// Create a new user
router.post('/', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).send(newUser);
});

// Read all users
router.get('/', (req, res) => {
    res.status(200).send(users);
});

// Read a user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// Update a user by ID
router.put('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users[index] = req.body;
        res.status(200).send(users[index]);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

module.exports = router;
