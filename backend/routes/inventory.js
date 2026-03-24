const express = require('express');
const router = express.Router();

// Mock database for inventory
let inventory = [];

// GET all inventory
router.get('/', (req, res) => {
    res.json(inventory);
});

// GET inventory by product ID
router.get('/:id', (req, res) => {
    const product = inventory.find(item => item.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// POST add inventory
router.post('/', (req, res) => {
    const newProduct = { id: inventory.length + 1, ...req.body };
    inventory.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT update inventory
router.put('/:id', (req, res) => {
    const index = inventory.findIndex(item => item.id === parseInt(req.params.id));
    if (index !== -1) {
        inventory[index] = { id: parseInt(req.params.id), ...req.body };
        res.json(inventory[index]);
    } else {
        res.status(404).send('Product not found');
    }
});

// GET low stock alerts
router.get('/low-stock', (req, res) => {
    const lowStock = inventory.filter(item => item.quantity < 5);
    res.json(lowStock);
});

// DELETE inventory
router.delete('/:id', (req, res) => {
    const index = inventory.findIndex(item => item.id === parseInt(req.params.id));
    if (index !== -1) {
        inventory.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
});

module.exports = router;