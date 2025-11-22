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

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Cart Model
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
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

// Order Model
const orderSchema = new mongoose.Schema({
  orderNumber: String,
  userId: String,
  items: [cartItemSchema],
  customerInfo: Object,
  deliveryMethod: Object,
  paymentMethod: String,
  subtotal: Number,
  deliveryCost: Number,
  total: Number,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// Routes

// Health check
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
    
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
app.post('/api/cart/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    const { product, color, size, quantity, customColor } = req.body;
    
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
    } else {
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
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Update item quantity
app.put('/api/cart/:userId/items/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { color, size, quantity } = req.body;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.productId === productId && 
      item.color === color && 
      item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Remove item from cart
app.delete('/api/cart/:userId/items/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { color, size } = req.body;
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => 
      !(item.productId === productId && 
        item.color === color && 
        item.size === size)
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// Clear cart
app.delete('/api/cart/:userId/clear', async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// Create order
app.post('/api/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { items, customerInfo, deliveryMethod, paymentMethod, subtotal, deliveryCost, total } = req.body;

    const orderNumber = 'KPA' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

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
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user's orders
app.get('/api/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});