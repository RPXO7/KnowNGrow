import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().lean();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    
    // Update product quantities
    for (const item of order.items) {
      const product = await Product.findOne({ productId: item.productId });
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      const batch = product.batches.find(b => b.batchId === item.batchId);
      if (!batch) {
        return res.status(404).json({ message: `Batch ${item.batchId} not found` });
      }

      if (batch.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient quantity in batch ${item.batchId}` });
      }

      batch.quantity -= item.quantity;
      product.quantity -= item.quantity;
      await product.save();
    }

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order details
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId }).lean();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;