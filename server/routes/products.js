import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Error fetching products', 
      error: error.message 
    });
  }
});

// Add new product
router.post('/', async (req, res) => {
  try {
    const { productId, name, vendorName, quantity, image, batches } = req.body;
    
    // Validate required fields
    if (!productId || !name || !vendorName ) {
      return res.status(400).json({ 
        message: 'Missing required fields' 
      });
    }

    // generate SKU

    const sku = await Product.generateSku();

    const product = new Product({
      productId,
      name,
      vendorName,
      sku,
      quantity: quantity || 0,
      image,
      batches: batches || []
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      message: 'Error creating product', 
      error: error.message 
    });
  }
});

// Add batch to product
router.post('/:productId/batches', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const batch = {
      batchId: req.body.batchId,
      productId: req.params.productId,
      quantity: req.body.quantity,
      mfgDate: req.body.mfgDate,
      expDate: req.body.expDate
    };

    product.batches.push(batch);
    product.quantity += batch.quantity;
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error adding batch:', error);
    res.status(500).json({ 
      message: 'Error adding batch', 
      error: error.message 
    });
  }
});

// Get product details
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId }).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      message: 'Error fetching product', 
      error: error.message 
    });
  }
});

export default router;