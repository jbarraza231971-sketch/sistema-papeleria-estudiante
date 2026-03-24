// salesController.js

// Import required libraries
const { SalesTransaction } = require('../models');

// Handle sales transaction
exports.createTransaction = async (req, res) => {
    try {
        const transaction = await SalesTransaction.create(req.body);
        return res.status(201).json({ transaction });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await SalesTransaction.findAll();
        return res.status(200).json({ transactions });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await SalesTransaction.update(req.body, { where: { id } });
        if (updated) {
            const updatedTransaction = await SalesTransaction.findOne({ where: { id } });
            return res.status(200).json({ transaction: updatedTransaction });
        }
        throw new Error('Transaction not found');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await SalesTransaction.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send();
        }
        throw new Error('Transaction not found');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};