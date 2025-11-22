import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId || userId === 'undefined') {
      return res.status(400).json({ 
        error: 'Valid user ID is required' 
      });
    }

    console.log(`🛒 Fetching cart for user: ${userId}`);
    
    const cart = await Cart.findOrCreate(userId);
    
    res.json({
      success: true,
      data: cart,
      message: 'Cart retrieved successfully'
    });
    
  } catch (error) {
    console.error('❌ Error fetching cart:', error);
    res.status(500).json({ 
      error: 'Failed to fetch cart',
      details: error.message 
    });
  }
});

// Add item to cart
router.post('/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    const { product, color, size, quantity, customColor } = req.body;

    if (!userId || userId === 'undefined') {
      return res.status(400).json({ 
        error: 'Valid user ID is required' 
      });
    }

    if (!product || !product.id) {
      return res.status(400).json({ 
        error: 'Product information is required' 
      });
    }

    console.log(`🛒 Adding item to cart for user: ${userId}`, {
      product: product.name,
      color,
      size,
      quantity
    });

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ 
        userId, 
        items: [] 
      });
    }

    const existingItemIndex = cart.items.findIndex(item => 
      item.productId === product.id && 
      item.color === color && 
      item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
      console.log(`📦 Updated existing item quantity to: ${cart.items[existingItemIndex].quantity}`);
    } else {
      // Add new item
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        color,
        size,
        customColor: customColor || '',
        quantity,
        length: product.length || ''
      });
      console.log(`📦 Added new item: ${product.name}`);
    }

    await cart.save();
    
    res.json({
      success: true,
      data: cart,
      message: 'Item added to cart successfully'
    });
    
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    res.status(500).json({ 
      error: 'Failed to add item to cart',
      details: error.message 
    });
  }
});

// Update item quantity
router.put('/:userId/items/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { color, size, quantity } = req.body;

    if (!userId || userId === 'undefined') {
      return res.status(400).json({ 
        error: 'Valid user ID is required' 
      });
    }

    console.log(`🛒 Updating item quantity for user: ${userId}`, {
      productId,
      color,
      size,
      quantity
    });

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ 
        error: 'Cart not found' 
      });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.productId === productId && 
      item.color === color && 
      item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ 
        error: 'Item not found in cart' 
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      const removedItem = cart.items[itemIndex];
      cart.items.splice(itemIndex, 1);
      console.log(`🗑️ Removed item: ${removedItem.name}`);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      console.log(`📦 Updated quantity to: ${quantity}`);
    }

    await cart.save();
    
    res.json({
      success: true,
      data: cart,
      message: 'Item quantity updated successfully'
    });
    
  } catch (error) {
    console.error('❌ Error updating cart:', error);
    res.status(500).json({ 
      error: 'Failed to update item quantity',
      details: error.message 
    });
  }
});

// Remove item from cart
router.delete('/:userId/items/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { color, size } = req.body;

    if (!userId || userId === 'undefined') {
      return res.status(400).json({ 
        error: 'Valid user ID is required' 
      });
    }

    console.log(`🛒 Removing item from cart for user: ${userId}`, {
      productId,
      color,
      size
    });

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ 
        error: 'Cart not found' 
      });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => 
      !(item.productId === productId && 
        item.color === color && 
        item.size === size)
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ 
        error: 'Item not found in cart' 
      });
    }

    await cart.save();
    console.log(`🗑️ Item removed successfully`);
    
    res.json({
      success: true,
      data: cart,
      message: 'Item removed from cart successfully'
    });
    
  } catch (error) {
    console.error('❌ Error removing from cart:', error);
    res.status(500).json({ 
      error: 'Failed to remove item from cart',
      details: error.message 
    });
  }
});

// Clear cart
router.delete('/:userId/clear', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId === 'undefined') {
      return res.status(400).json({ 
        error: 'Valid user ID is required' 
      });
    }

    console.log(`🛒 Clearing cart for user: ${userId}`);

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ 
        error: 'Cart not found' 
      });
    }

    const itemCount = cart.items.length;
    cart.items = [];
    await cart.save();
    
    console.log(`🗑️ Cleared ${itemCount} items from cart`);
    
    res.json({
      success: true,
      data: cart,
      message: `Cart cleared successfully (${itemCount} items removed)`
    });
    
  } catch (error) {
    console.error('❌ Error clearing cart:', error);
    res.status(500).json({ 
      error: 'Failed to clear cart',
      details: error.message 
    });
  }
});

export default router;