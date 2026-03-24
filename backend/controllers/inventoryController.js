const Inventory = require('../models/inventoryModel');

class InventoryController {
    static async checkStock(req, res) {
        try {
            const items = await Inventory.find();
            const lowStockItems = items.filter(item => item.quantity < item.reorderLevel);
            if (lowStockItems.length > 0) {
                // Alert logic can be added here, e.g., sending an email or notification
                res.status(200).json(lowStockItems);
            } else {
                res.status(200).json({ message: 'All items are in stock' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving inventory', error });
        }
    }

    // Additional inventory management methods can be added here
}

module.exports = InventoryController;