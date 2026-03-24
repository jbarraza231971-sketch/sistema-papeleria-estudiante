const express = require('express');
const router = express.Router();

const products = []; // Simulated in-memory product storage

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found.');
    }
});

// POST create a new product
router.post('/', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT update a product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        res.json(product);
    } else {
        res.status(404).send('Product not found.');
    }
});

// DELETE a product
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Product not found.');
    }
});

module.exports = router;