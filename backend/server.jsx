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
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔗 Connecting to MongoDB...');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
})
.catch((error) => {
  console.error('❌ MongoDB connection failed:', error);
  process.exit(1);
});

// Cart Schema
const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  image: String,
  category: String,
  color: String,
  size: String,
  customColor: String,
  quantity: Number,
  length: String
});

const cartSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  items: [cartItemSchema],
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Cart = mongoose.model('Cart', cartSchema);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running!', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Get user's cart
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log('📥 GET Cart - User:', userId);

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      console.log('🆕 Creating new cart for user:', userId);
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    console.log('✅ Cart found - Items:', cart.items.length);
    
    res.json({
      success: true,
      items: cart.items,
      userId: cart.userId
    });

  } catch (error) {
    console.error('❌ GET Cart Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch cart' 
    });
  }
});

// Add item to cart
app.post('/api/cart/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    const { product, color, size, quantity, customColor } = req.body;

    console.log('➕ POST Add Item - User:', userId, 'Product:', product.name);

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => 
      item.productId === product.id && 
      item.color === color && 
      item.size === size
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      console.log('📈 Updated quantity to:', cart.items[existingItemIndex].quantity);
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        color: color || '',
        size: size || '',
        customColor: customColor || '',
        quantity: quantity,
        length: product.length || ''
      });
      console.log('🆕 Added new item');
    }

    await cart.save();
    console.log('✅ Cart saved - Total items:', cart.items.length);
    
    res.json({
      success: true,
      items: cart.items,
      userId: cart.userId
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
      item.color === color && 
      item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false,
        error: 'Item not found in cart' 
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
      console.log('🗑️ Removed item from cart');
    } else {
      cart.items[itemIndex].quantity = quantity;
      console.log('📈 Updated quantity to:', quantity);
    }

    await cart.save();

    res.json({
      success: true,
      items: cart.items,
      userId: cart.userId
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

    console.log('🗑️ DELETE Remove Item - User:', userId, 'Product:', productId);

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        error: 'Cart not found' 
      });
    }

    cart.items = cart.items.filter(item => 
      !(item.productId === productId && 
        item.color === color && 
        item.size === size)
    );

    await cart.save();
    console.log('✅ Item removed - Remaining items:', cart.items.length);

    res.json({
      success: true,
      items: cart.items,
      userId: cart.userId
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

    console.log('🧹 DELETE Clear Cart - User:', userId);

    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ 
        success: false,
        error: 'Cart not found' 
      });
    }

    cart.items = [];
    await cart.save();
    console.log('✅ Cart cleared');

    res.json({
      success: true,
      items: [],
      userId: cart.userId
    });

  } catch (error) {
    console.error('❌ DELETE Clear Cart Error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to clear cart' 
    });
  }
});

// Debug endpoint to see all carts
app.get('/api/debug/carts', async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.json({ 
      success: true, 
      totalCarts: carts.length,
      carts: carts.map(cart => ({
        userId: cart.userId,
        itemCount: cart.items.length,
        updatedAt: cart.updatedAt
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});