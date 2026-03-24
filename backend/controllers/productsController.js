const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

// Sample in-memory storage for products
let products = [];

// Create a new product
router.post('/products', async (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Read all products
router.get('/products', (req, res) => {
    res.json(products);
});

// Read a single product
router.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found.');
    res.json(product);
});

// Update a product
router.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found.');

    const { name, price } = req.body;
    product.name = name;
    product.price = price;
    res.json(product);
});

// Delete a product
router.delete('/products/:id', (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Generate QR code for a product
router.get('/products/:id/qrcode', async (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found.');

    try {
        const qrCodeDataUrl = await QRCode.toDataURL(`Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price}`);
        res.json({ qrCode: qrCodeDataUrl });
    } catch (err) {
        res.status(500).send('Failed to generate QR code.');
    }
});

module.exports = router;