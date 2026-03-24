'use strict';

const express = require('express');
const router = express.Router();

// Sample data to simulate transactions
let salesTransactions = [];

// GET route to fetch all sales transactions
router.get('/', (req, res) => {
    res.json(salesTransactions);
});

// POST route to create a new sales transaction
router.post('/', (req, res) => {
    const { item, quantity, price } = req.body;
    if (!item || !quantity || !price) {
        return res.status(400).json({ message: 'Item, quantity, and price are required.' });
    }

    const newTransaction = { id: salesTransactions.length + 1, item, quantity, price, date: new Date() };
    salesTransactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

// DELETE route to remove a sales transaction by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    salesTransactions = salesTransactions.filter(transaction => transaction.id !== parseInt(id));
    res.status(204).send();
});

module.exports = router;
