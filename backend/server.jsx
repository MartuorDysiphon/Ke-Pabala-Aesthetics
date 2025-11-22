import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://pabala-aesthetics.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔗 Connecting to MongoDB...');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log('📊 Database:', mongoose.connection.name);
})
.catch((error) => {
  console.error('❌ MongoDB connection failed:', error);
  process.exit(1);
});

// Cart Schema
const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String, default: '' },
  size: { type: String, default: '' },
  customColor: { type: String, default: '' },
  quantity: { type: Number, required: true, min: 1 },
  length: { type: String, default: '' }
}, { _id: true });

const cartSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true
  },
  items: [cartItemSchema],
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'Server is running!', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Get user's cart
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({
        success: false,
        error: 'Valid user ID is required'
      });
    }

    console.log('📥 GET Cart - User:', userId);

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      console.log('🆕 Creating new cart for user:', userId);
      cart = new Cart({ 
        userId, 
        items: [] 
      });
      await cart.save();
    }

    console.log('✅ Cart found - Items:', cart.items.length);
    
    res.json({
      success: true,
      data: {
        items: cart.items,
        userId: cart.userId,
        updatedAt: cart.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ GET Cart Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cart from server'
    });
  }
});

// Add item to cart
app.post('/api/cart/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    const { product, color, size, quantity, customColor } = req.body;

    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({
        success: false,
        error: 'Valid user ID is required'
      });
    }

    if (!product || !product.id) {
      return res.status(400).json({
        success: false,
        error: 'Product information is required'
      });
    }

    console.log('➕ POST Add Item - User:', userId, 'Product:', product.name);

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Find existing item
    const existingItemIndex = cart.items.findIndex(item => 
      item.productId === product.id && 
      item.color === (color || '') && 
      item.size === (size || '')
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
      console.log('📈 Updated existing item quantity to:', cart.items[existingItemIndex].quantity);
    } else {
      // Add new item
      const newItem = {
        productId: product.id.toString(),
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        category: product.category,
        color: color || '',
        size: size || '',
        customColor: customColor || '',
        quantity: quantity,
        length: product.length || ''
      };
      
      cart.items.push(newItem);
      console.log('🆕 Added new item:', product.name);
    }

    cart.updatedAt = new Date();
    await cart.save();

    console.log('✅ Cart saved successfully - Total items:', cart.items.length);
    
    res.json({
      success: true,
      data: {
        items: cart.items,
        userId: cart.userId,
        updatedAt: cart.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ POST Add Item Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add item to cart'
    });
  }
});

// Update item quantity
app.put('/api/cart/:userId/items/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { color, size, quantity } = req.body;

    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({
        success: false,
        error: 'Valid user ID is required'
      });
    }

    console.log('📊 PUT Update Quantity - User:', userId, 'Product:', productId, 'Quantity:', quantity);

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.productId === productId && 
      item.color === (color || '') && 
      item.size === (size || '')
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in cart'
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
      console.log('🗑️ Removed item from cart');
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      console.log('📈 Updated quantity to:', quantity);
    }

    cart.updatedAt = new Date();
    await cart.save();

    res.json({
      success: true,
      data: {
        items: cart.items,
        userId: cart.userId,
        updatedAt: cart.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ PUT Update Quantity Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update item quantity'
    });
  }
});

// Remove item from cart
app.delete('/api/cart/:userId/items/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { color, size } = req.body;

    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({
        success: false,
        error: 'Valid user ID is required'
      });
    }

    console.log('🗑️ DELETE Remove Item - User:', userId, 'Product:', productId);

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => 
      !(item.productId === productId && 
        item.color === (color || '') && 
        item.size === (size || ''))
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in cart'
      });
    }

    cart.updatedAt = new Date();
    await cart.save();

    console.log('✅ Item removed successfully - Remaining items:', cart.items.length);

    res.json({
      success: true,
      data: {
        items: cart.items,
        userId: cart.userId,
        updatedAt: cart.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ DELETE Remove Item Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove item from cart'
    });
  }
});

// Clear cart
app.delete('/api/cart/:userId/clear', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(400).json({
        success: false,
        error: 'Valid user ID is required'
      });
    }

    console.log('🧹 DELETE Clear Cart - User:', userId);

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }

    const itemCount = cart.items.length;
    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();

    console.log('✅ Cart cleared - Removed', itemCount, 'items');

    res.json({
      success: true,
      data: {
        items: [],
        userId: cart.userId,
        updatedAt: cart.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ DELETE Clear Cart Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear cart'
    });
  }
});

// Debug endpoint to see all carts (remove in production)
app.get('/api/debug/carts', async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.json({
      success: true,
      data: {
        totalCarts: carts.length,
        carts: carts.map(cart => ({
          userId: cart.userId,
          itemCount: cart.items.length,
          updatedAt: cart.updatedAt
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server gracefully...');
  await mongoose.connection.close();
  console.log('📊 MongoDB connection closed');
  process.exit(0);
});