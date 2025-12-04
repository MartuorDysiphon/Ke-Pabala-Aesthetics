import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Get user's cart
router.get('/', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    console.log('Fetching cart for user:', clerkUserId);
    
    let cart = await Cart.findOne({ clerkUserId });
    
    if (!cart) {
      console.log('No cart found, creating new one for user:', clerkUserId);
      cart = new Cart({
        clerkUserId,
        items: []
      });
      await cart.save();
    }
    
    console.log('Cart fetched successfully for user:', clerkUserId);
    res.json({
      success: true,
      data: cart
    });
    
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch cart',
      message: error.message 
    });
  }
});

// Add item to cart
router.post('/items', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const { product, color, size, quantity = 1, customColor = null } = req.body;
    
    console.log('Adding item to cart for user:', clerkUserId, 'Product:', product.name);
    
    // Validate required fields
    if (!product || !color || !size) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: product, color, and size are required'
      });
    }
    
    let cart = await Cart.findOne({ clerkUserId });
    
    if (!cart) {
      cart = new Cart({ 
        clerkUserId, 
        items: [] 
      });
    }
    
    // Check if item already exists with same id, color, and size
    const existingItemIndex = cart.items.findIndex(item => 
      item.id === product.id && 
      item.color === color && 
      item.size === size
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
      console.log('Updated existing item quantity:', cart.items[existingItemIndex].quantity);
    } else {
      // Add new item
      const newItem = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        color,
        size,
        quantity,
        customColor,
        category: product.category || 'General',
        displayName: product.displayName || product.name
      };
      
      cart.items.push(newItem);
      console.log('Added new item to cart:', newItem.displayName);
    }
    
    await cart.save();
    
    res.json({
      success: true,
      data: cart,
      message: 'Item added to cart successfully'
    });
    
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to add item to cart',
      message: error.message 
    });
  }
});

// Update item quantity
router.put('/items/:itemId', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const { itemId } = req.params;
    const { quantity, color, size } = req.body;
    
    console.log('Updating item quantity for user:', clerkUserId, 'Item:', itemId);
    
    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Quantity is required'
      });
    }
    
    const cart = await Cart.findOne({ clerkUserId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }
    
    const itemIndex = cart.items.findIndex(item => 
      item.id === itemId && 
      item.color === color && 
      item.size === size
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in cart'
      });
    }
    
    if (quantity < 1) {
      // Remove item if quantity is 0
      const removedItem = cart.items.splice(itemIndex, 1)[0];
      console.log('Removed item from cart:', removedItem.displayName);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      console.log('Updated item quantity:', cart.items[itemIndex].displayName, 'New quantity:', quantity);
    }
    
    await cart.save();
    
    res.json({
      success: true,
      data: cart,
      message: 'Cart updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update cart item',
      message: error.message 
    });
  }
});

// Remove item from cart
router.delete('/items/:itemId', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const { itemId } = req.params;
    const { color, size } = req.body;
    
    console.log('Removing item from cart for user:', clerkUserId, 'Item:', itemId);
    
    const cart = await Cart.findOne({ clerkUserId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }
    
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => 
      !(item.id === itemId && item.color === color && item.size === size)
    );
    
    if (cart.items.length === initialLength) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in cart'
      });
    }
    
    await cart.save();
    console.log('Item removed from cart successfully');
    
    res.json({
      success: true,
      data: cart,
      message: 'Item removed from cart successfully'
    });
    
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to remove item from cart',
      message: error.message 
    });
  }
});

// Clear cart
router.delete('/clear', async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    
    console.log('Clearing cart for user:', clerkUserId);
    
    const cart = await Cart.findOne({ clerkUserId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }
    
    cart.items = [];
    await cart.save();
    
    console.log('Cart cleared successfully for user:', clerkUserId);
    
    res.json({
      success: true,
      data: cart,
      message: 'Cart cleared successfully'
    });
    
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to clear cart',
      message: error.message 
    });
  }
});

export default router;