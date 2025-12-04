import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const { 
      orderNumber, 
      items, 
      customerInfo, 
      deliveryMethod, 
      paymentMethod, 
      subtotal, 
      deliveryCost, 
      total,
      notes = '' 
    } = req.body;

    console.log('Creating new order for user:', clerkUserId, 'Order number:', orderNumber);

    // Validate required fields
    if (!items || !customerInfo || !deliveryMethod || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: items, customerInfo, deliveryMethod, and paymentMethod are required'
      });
    }

    const order = new Order({
      clerkUserId,
      orderNumber: orderNumber || `KPA${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      items,
      customerInfo,
      deliveryMethod,
      paymentMethod,
      subtotal: parseFloat(subtotal) || 0,
      deliveryCost: parseFloat(deliveryCost) || 0,
      total: parseFloat(total) || 0,
      notes,
      status: 'pending'
    });

    await order.save();
    
    console.log('Order created successfully:', order.orderNumber);

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Order number already exists'
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to create order',
      message: error.message 
    });
  }
});

// Get user's orders
router.get('/', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const { limit = 10, page = 1 } = req.query;
    
    console.log('Fetching orders for user:', clerkUserId);

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const orders = await Order.find({ clerkUserId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    const totalOrders = await Order.countDocuments({ clerkUserId });
    
    console.log(`Found ${orders.length} orders for user:`, clerkUserId);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
          hasNext: skip + orders.length < totalOrders,
          hasPrev: page > 1
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch orders',
      message: error.message 
    });
  }
});

// Get specific order
router.get('/:orderNumber', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const { orderNumber } = req.params;
    
    console.log('Fetching order:', orderNumber, 'for user:', clerkUserId);

    const order = await Order.findOne({ clerkUserId, orderNumber });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    console.log('Order found:', order.orderNumber);

    res.json({
      success: true,
      data: order
    });
    
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch order',
      message: error.message 
    });
  }
});

// Update order status
router.patch('/:orderNumber/status', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const { orderNumber } = req.params;
    const { status } = req.body;
    
    console.log('Updating order status:', orderNumber, 'New status:', status);

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Valid status is required. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const order = await Order.findOneAndUpdate(
      { clerkUserId, orderNumber },
      { status },
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    console.log('Order status updated successfully:', order.orderNumber, 'New status:', order.status);

    res.json({
      success: true,
      data: order,
      message: 'Order status updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update order status',
      message: error.message 
    });
  }
});

export default router;