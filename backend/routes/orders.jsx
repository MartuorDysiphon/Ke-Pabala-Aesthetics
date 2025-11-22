import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create new order
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { 
      items, 
      customerInfo, 
      deliveryMethod, 
      paymentMethod, 
      subtotal, 
      deliveryCost, 
      total 
    } = req.body;

    if (!userId || userId === 'undefined') {
      return res.status(400).json({ 
        error: 'Valid user ID is required' 
      });
    }

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'Order items are required' 
      });
    }

    if (!customerInfo || !deliveryMethod || !paymentMethod) {
      return res.status(400).json({ 
        error: 'Customer info, delivery method, and payment method are required' 
      });
    }

    console.log(`📦 Creating order for user: ${userId}`, {
      itemCount: items.length,
      total,
      paymentMethod
    });

    // Generate order number
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumber = `KPA${timestamp}${random}`;

    const order = new Order({
      orderNumber,
      userId,
      items,
      customerInfo,
      deliveryMethod,
      paymentMethod,
      subtotal,
      deliveryCost,
      total
    });

    await order.save();
    
    console.log(`✅ Order created successfully: ${orderNumber}`);
    
    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully'
    });
    
  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message 
    });
  }
});

// Get user's orders
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId === 'undefined') {
      return res.status(400).json({ 
        error: 'Valid user ID is required' 
      });
    }

    console.log(`📋 Fetching orders for user: ${userId}`);

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .select('-__v'); // Exclude version key

    res.json({
      success: true,
      data: orders,
      count: orders.length,
      message: 'Orders retrieved successfully'
    });
    
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ 
      error: 'Failed to fetch orders',
      details: error.message 
    });
  }
});

// Get specific order by order number
router.get('/:userId/order/:orderNumber', async (req, res) => {
  try {
    const { userId, orderNumber } = req.params;

    if (!userId || userId === 'undefined') {
      return res.status(400).json({ 
        error: 'Valid user ID is required' 
      });
    }

    console.log(`📋 Fetching order: ${orderNumber} for user: ${userId}`);

    const order = await Order.findOne({ 
      userId, 
      orderNumber 
    });

    if (!order) {
      return res.status(404).json({ 
        error: 'Order not found' 
      });
    }

    res.json({
      success: true,
      data: order,
      message: 'Order retrieved successfully'
    });
    
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({ 
      error: 'Failed to fetch order',
      details: error.message 
    });
  }
});

export default router;